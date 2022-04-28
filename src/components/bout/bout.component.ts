import { Component, Input } from '@angular/core';

import { Bout } from './bout.model';

@Component({
  selector: 'dcg-bout',
  templateUrl: './bout.component.html',
})
export class BoutComponent {
  @Input()
  public bout: Bout = {};
}
