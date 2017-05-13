import {Component, Input, Output, EventEmitter, HostListener, Directive } from '@angular/core';
import {MdDialogRef, MdDialog, ComponentType, MdDialogConfig} from "@angular/material";
/**
 *  <button color="primary"
            md-raised-button
            appDialog
            [data]="{param1: param1, param2: param2}"
            [component]="component"
            (onDialogResult)="editItem($event)">Click</button>
 */
@Directive({
    selector: '[appDialog]'
})
export class DialogDirective {
    @Input() public data: any;
    @Input() public component: Component;
    @Input() public disableClose: boolean = false;
    @Output() public onDialogResult = new EventEmitter<any>();

    constructor(public dialog: MdDialog) { }

    @HostListener("click", ["$event"]) openDialog() {
        const ref: MdDialogRef<Component> = this.dialog.open(
            this.component as ComponentType<Component>,
            {
                disableClose: this.disableClose
            } as MdDialogConfig
        );
        ref.componentInstance['data'] = this.data;
        ref.afterClosed().subscribe(result => this.onDialogResult.emit(result));
    }
}