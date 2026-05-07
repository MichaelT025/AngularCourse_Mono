import { Directive, input, inject, ElementRef } from "@angular/core";
import { LogDirective } from "./log.directive";
@Directive({
    selector: 'a[appSafelink]',
    standalone: true,
    host: {
        '(click)': 'onConfirmLeavePage($event)',
        'target': '_blank',
        'rel': 'noopener noreferrer'
    },
    hostDirectives: [LogDirective],
})
export class SafeLinkDiective { 
    queryParam = input('myapp', {alias: 'appSafelink'});
    private hostElementRef=inject<ElementRef<HTMLAnchorElement>>(ElementRef);
    constructor() { 
        console.log('SafeLinkDirective is active!');
    }

    onConfirmLeavePage(event: MouseEvent) {
        const wantsToLeave = window.confirm('Do you want to leave the app?');
        if (wantsToLeave) {
            const address =this.hostElementRef.nativeElement.href;
            this.hostElementRef.nativeElement.href= address+'?from=' + this.queryParam();
            return;
        }
        event.preventDefault();
    }

}