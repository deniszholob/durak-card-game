import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardBadgeComponent } from './card-badge.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CardBadgeComponent],
  exports: [CardBadgeComponent],
})
export class CardBadgeModule {}
