import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PlayingCardModule } from '../playing-card/playing-card.module';
import { CardSetComponent } from './card-set.component';

@NgModule({
  imports: [CommonModule, PlayingCardModule],
  declarations: [CardSetComponent],
  exports: [CardSetComponent],
})
export class CardSetModule {}
