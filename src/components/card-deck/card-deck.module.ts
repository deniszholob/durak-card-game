import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PlayingCardModule } from '../playing-card/playing-card.module';
import { CardDeckComponent } from './card-deck.component';

@NgModule({
  imports: [CommonModule, PlayingCardModule],
  declarations: [CardDeckComponent],
  exports: [CardDeckComponent],
})
export class CardDeckModule {}
