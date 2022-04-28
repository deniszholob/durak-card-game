import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PlayingCardModule } from '../playing-card/playing-card.module';
import { BoutComponent } from './bout.component';

@NgModule({
  imports: [CommonModule, PlayingCardModule],
  declarations: [BoutComponent],
  exports: [BoutComponent],
})
export class BoutModule {}
