import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ActionCard } from '../models/game-action.model';
import { CardOverlay } from './card-overlay.model';

@Component({
  selector: 'dcg-card-overlay',
  templateUrl: './card-overlay.component.html',
})
export class CardOverlayComponent {
  @Input()
  public cardOverlay?: CardOverlay;

  @Output()
  public actionChange = new EventEmitter<ActionCard>();

  // constructor() {}

  // ngOnInit(): void {}

  public onAction(a: ActionCard): void {
    this.actionChange.emit(a);
  }
}
