# Angular EventEmitters / @Output

## What it is
`EventEmitter` lets a **child component** send data or signals **up** to its **parent component**.

## In the child
1. Import `Output` and `EventEmitter`
2. Declare an `@Output()` property
3. Call `.emit()` when something happens

```ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({ ... })
export class NewTask {
  @Output() cancel = new EventEmitter<void>();

  onCancel() {
    this.cancel.emit();       // emits with no data
  }
}
```

## In the parent template
Listen with **parentheses** `()` on the child tag, then call a handler:

```html
<app-new-task (cancel)="onCancelAddTask()"/>
```

- `(cancel)` listens for the child's `cancel` event
- `onCancelAddTask()` runs when that event fires
- **Don't forget `()`** — `(cancel)="handler"` (no parens) triggers NG8111

## Emitting data
If you need to pass a value up:

```ts
@Output() complete = new EventEmitter<string>();

onComplete(id: string) {
  this.complete.emit(id);
}
```

Parent catches it with `$event`:

```html
<app-task (complete)="onCompleteTask($event)">
```

## Summary
- **Child:** `@Output() name = new EventEmitter<type>()` + `this.name.emit(value?)`
- **Parent:** `(name)="handler($event?)"`

---

# `.backdrop` — Modal Overlay Pattern

## What it is
A full-screen, semi-transparent layer behind a modal/dialog. It blocks interaction with the rest of the page and usually lets the user click to close.

## HTML
```html
<div class="backdrop" (click)="onCancel()"></div>
<dialog open>
  <!-- modal content -->
</dialog>
```

## CSS
```css
.backdrop {
  background-color: rgba(0, 0, 0, 0.9); /* near-black, see-through */
  position: fixed;                         /* stays in place while scrolling */
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;                           /* full viewport height */
}
```

## Key properties
- **`position: fixed`** — stays locked to the viewport even if the page scrolls
- **`rgba(0, 0, 0, 0.9)`** — black with 90% opacity; dim everything behind the modal
- **`(click)="onCancel()"`** — clicking the backdrop (outside the dialog) triggers the cancel event

## How it works with `<dialog>`
The `<dialog>` element sits **on top** of the backdrop (later in the DOM = higher default stacking). The backdrop covers the entire page, the dialog floats above it, and clicking the dimmed area dismisses the modal.

## Summary
- `.backdrop` = full-screen tinted overlay
- `position: fixed` + `inset: 0` (or `top/left/width/height`) covers everything
- Often has a click handler to close the modal
- `<dialog>` appears above it due to normal stacking order

---

# Angular Signals

## What they are
Signals are Angular's **fine-grained reactivity system**. A signal is a wrapper around a value that notifies consumers whenever that value changes. Angular can then update **only** the parts of the DOM that depend on that value, rather than re-checking the whole component.

## Creating a signal
Import `signal` and call it with an initial value:

```ts
import { signal } from '@angular/core';

export class Counter {
  count = signal(0);          // number signal
  name = signal('Angular');     // string signal
  isOn = signal(false);         // boolean signal
}
```

## Reading a signal
Call it like a **function** — this is how Angular tracks where the signal is used:

```ts
console.log(this.count());    // 0
```

Template (no `()` needed in the binding, Angular handles it):

```html
<p>{{ count() }}</p>
```

## Writing to a signal
Use `.set()` or `.update()`:

```ts
this.count.set(5);            // replace the value
this.count.update(c => c + 1); // derive new value from old
```

## `computed()` — derived signals
Create a read-only signal based on other signals. It auto-updates when its dependencies change.

```ts
import { computed } from '@angular/core';

price = signal(100);
quantity = signal(2);

total = computed(() => this.price() * this.quantity());
// total() === 200
```

## `effect()` — side effects
Runs a function whenever any signal inside it changes. Good for debugging, localStorage, etc.

```ts
import { effect } from '@angular/core';

constructor() {
  effect(() => {
    console.log('Count changed:', this.count());
  });
}
```

## Why signals over plain properties?

| Plain property | Signal |
|---|---|
| `name = 'John'` | `name = signal('John')` |
| Change Detection must check everything | Only dependents update |
| `this.name = 'Jane'` | `this.name.set('Jane')` |
| Read: `this.name` | Read: `this.name()` |

## Summary
- **Create:** `signal(initialValue)`
- **Read:** `mySignal()` (call it like a function)
- **Write:** `mySignal.set(value)` or `mySignal.update(fn)`
- **Derive:** `computed(() => ...)`
- **React:** `effect(() => { ... })`

---

# `@Injectable` — Services & Dependency Injection

## What it is
`@Injectable` tells Angular: *"This class is a service that can be created by the Dependency Injection (DI) system and given to other classes that need it."*

Without it, Angular won't know to manage the class as a singleton or inject it anywhere.

## Registering a service

```ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = [...];

  getUserTasks(userId: string) { ... }
  addTask(taskData, userId) { ... }
  removeTask(id: string) { ... }
}
```

| Part | Meaning |
|---|---|
| `@Injectable()` | Marks the class for Angular's DI system |
| `providedIn: 'root'` | Create **one** instance at app start; share it everywhere |

## Injecting it — two ways

### 1. Constructor injection (classic)

```ts
import { TasksService } from './tasks.services';

export class Tasks {
  constructor(private tasksService: TasksService) {}

  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.id);
  }
}
```

### 2. `inject()` function (modern, standalone components)

```ts
import { inject } from '@angular/core';
import { TasksService } from '../tasks.services';

export class NewTask {
  private tasksService = inject(TasksService);

  onSubmit() {
    this.tasksService.addTask({ ... }, this.userId);
  }
}
```

- `inject()` must be called in an **injection context** (inside a class constructor body or at field initialization time)
- Useful when you don't want to use a constructor at all

## Why not just `new TasksService()`?

| Manual `new` | Angular DI |
|---|---|
| You create and manage the instance | Angular creates and manages it |
| Every `new` = a separate copy | `providedIn: 'root'` = **one** shared instance |
| If the service needs `HttpClient`, you must build the whole chain yourself | Angular resolves nested dependencies automatically |
| Hard to swap for testing | Easy to swap implementations globally |

## Summary
- **Register:** `@Injectable({ providedIn: 'root' })`
- **Inject (constructor):** `constructor(private svc: MyService) {}`
- **Inject (modern):** `private svc = inject(MyService)`
- **Benefit:** single source of truth, automatic dependency chains, testable

---

# `ng-content` — CSS Selectors for Content Projection

## What it is
`ng-content` with `select="...""` lets you **project specific pieces** of a parent template into **named slots** inside a child component. The `select` value is a **CSS selector**, so you use the same syntax you use in stylesheets.

## How it works

Inside the child component template, you define one or more `ng-content` slots:

```html
<!-- button.component.html -->
<span class="text">
  <ng-content/>
</span>
<span class="icon">
  <ng-content select="icon"/>
</span>
```

Inside the parent template, you pass content that matches those selectors:

```html
<!-- parent.component.html -->
<app-button>
  <span>Logout</span>     <!-- catches the first slot (default) -->
  <span class="icon">→</span>  <!-- does NOT match "icon" element selector -->
</app-button>
```

**Result:** the `→` **does not** land in the icon slot because `"icon"` looks for an **element** named `<icon>`, not a class.

## Selector types

| Selector | What it matches | Example |
|---|---|---|
| `"icon"` | Element named `<icon>` | `<icon>→</icon>` |
| `".icon"` | Any element with class `icon` | `<span class="icon">→</span>` |
| `"#save"` | Element with id `save` | `<button id="save">Save</button>` |
| `"input"` | Element named `<input>` | `<input name="title"/>` |
| `"input, textarea"` | Multiple elements (comma-separated) | `<input/>` or `<textarea/>` |

## `ngProjectAs` — projecting as a different element

If your parent template uses a real HTML element but you want Angular to treat it as a slot selector, use `ngProjectAs`:

```html
<!-- parent.component.html -->
<app-button>
  <span>Logout</span>
  <span ngProjectAs="icon" class="icon">→</span>
</app-button>
```

Now Angular sees this `<span>` as if it were `<icon>`, so `"select=\"icon\""` matches it.

## Why the difference matters

```html
<!-- button.component.html -->
<span class="icon">
  <ng-content select="icon"/>
</span>
```

vs.

```html
<span class="icon">
  <ng-content select=".icon"/>
</span>
```

| `select` | Needs in parent | Result |
|---|---|---|
| `select="icon"` | `<icon>…</icon>` or `ngProjectAs="icon"` | Projects correctly |
| `select=".icon"` | `<span class="icon">…</span>` | Projects correctly |
| `select="icon"` | `<span class="icon">…</span>` | **Fails silently** — no match |

## Summary
- `select` uses **standard CSS selectors**
- `"icon"` = element selector (looks for `<icon>`)
- `".icon"` = class selector (looks for `class="icon"`)
- `"#id"` = id selector
- `"tagA, tagB"` = multiple selectors (comma-separated)
- Use `ngProjectAs="selector"` to make a real HTML element pretend to be a different selector
- No match = content is silently **dropped** (not rendered)

---

# ViewEncapsulation

## What it is
Angular scopes each component's CSS so styles don't leak out and affect other components. It does this by adding unique attributes to elements and rewriting your CSS selectors.

## The Three Modes

| Mode | What it does |
|---|---|
| `Emulated` (default) | Angular adds unique attributes (e.g., `_ngcontent-ng-c123`) to this component's elements and rewrites CSS to target only those elements. Styles are isolated. |
| `None` | CSS is dumped into the **global** stylesheet with **no scoping**. Styles affect everything in the app. |
| `ShadowDom` | Uses native browser Shadow DOM. Rarely used. |

## Default (Emulated) — how it works

```html
<!-- Your template -->
<p class="control">...</p>

<!-- Rendered DOM -->
<p class="control" _ngcontent-ng-c123>...</p>
```

Your CSS `.control { ... }` becomes `.control[_ngcontent-ng-c123] { ... }` — only this component's elements get the attribute, so styles stay isolated.

## Why use `None`?

Needed when you project content via `ng-content` and want to style that projected content.

```html
<!-- control.component.html -->
<p class="control">
    <label>{{ label() }}</label>
    <ng-content select="input, textarea"></ng-content>  <!-- from parent -->
</p>
```

With **Emulated** encapsulation:
- The `<p>` and `<label>` get the scoped attribute
- The projected `<input>` / `<textarea>` do **NOT** — they belong to the parent component
- CSS like `.control input` becomes `.control input[_ngcontent-ng-c...]` which **won't match**
- **Result:** styles don't apply to projected content

With **`ViewEncapsulation.None`**:
- CSS is added globally: `.control input { ... }`
- Matches **any** input inside `.control`, even projected ones
- **Result:** styles apply correctly

## Trade-off

| `None` | `Emulated` (default) |
|---|---|
| Styles leak globally — can clash with other components | Styles are isolated — safe default |
| Required for styling projected (`ng-content`) content | Projected content won't receive scoped styles |
| Use unique class names (e.g., `.app-control`) to avoid collisions | No collision risk |

## When to use each

- **`Emulated`** — default, use for most components
- **`None`** — use when your component projects content via `ng-content` and you need to style that projected content (e.g., form controls wrapping `<input>`, buttons wrapping text)
- **`ShadowDom`** — rarely needed, for true native encapsulation

## Code example

```ts
import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None  // needed to style projected inputs
})
export class ControlComponent {
  label = input.required<string>();
}
```

```html
<!-- control.component.html -->
<p class="control">
    <label>{{ label() }}</label>
    <ng-content select="input, textarea"></ng-content>
</p>
```

```css
/* control.component.css — now applies globally */
.control label {
  display: block;
  font-size: 0.8rem;
  font-weight: bold;
}

.control input,
.control textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
}
```
