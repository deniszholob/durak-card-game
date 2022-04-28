import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardOverlayModule } from '../card-overlay/card-overlay.module';
import { PlayingCardComponent } from './playing-card.component';

@NgModule({
  imports: [CommonModule, CardOverlayModule],
  declarations: [PlayingCardComponent],
  exports: [PlayingCardComponent],
})
export class PlayingCardModule {}
