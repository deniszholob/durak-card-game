import { Component, Input } from '@angular/core';

import { Battle } from './battle.model';

@Component({
  selector: 'dcg-battle',
  templateUrl: './battle.component.html',
})
export class BattleComponent {
  @Input()
  public battle: Battle = [];
}
