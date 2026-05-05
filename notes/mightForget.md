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
