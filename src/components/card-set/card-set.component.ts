import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ActionCard } from '../models/game-action.model';
import { PlayingCard } from '../playing-card/playing-card.model';

@Component({
  selector: 'dcg-card-set',
  templateUrl: './card-set.component.html',
})
export class CardSetComponent {
  @Input()
  public cards: PlayingCard[] = [];
  @Input()
  public setActions: ActionCard[] = [];

  @Output()
  public actionChange = new EventEmitter<ActionCard>();

  public getActionsForCard(card: PlayingCard): ActionCard[] {
    const actions = this.setActions.filter(
      (a: ActionCard): boolean => !!a.card.isEqual(card)
    );
    return actions;
  }

  public onCardAction(action: ActionCard): void {
    this.actionChange.emit(action);
  }
}
