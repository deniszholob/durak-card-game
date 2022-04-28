import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardOverlayComponent } from './card-overlay.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CardOverlayComponent],
  exports: [CardOverlayComponent],
})
export class CardOverlayModule {}
