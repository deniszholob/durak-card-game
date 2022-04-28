import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dcg-switch',
  templateUrl: './switch.component.html',
})
export class SwitchComponent {
  @Input()
  public text = '';

  @Output()
  public statusChange = new EventEmitter<boolean>();

  private status = false;

  public onChange() {
    this.status = !this.status;
    this.statusChange.emit(this.status);
  }
}
