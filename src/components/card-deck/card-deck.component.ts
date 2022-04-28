import { Component, Input } from '@angular/core';

import { CardDeck } from './card-deck.model';

@Component({
  selector: 'dcg-card-deck',
  templateUrl: './card-deck.component.html',
})
export class CardDeckComponent {
  @Input()
  public spread = false;

  @Input()
  public deck: CardDeck | undefined;
}
