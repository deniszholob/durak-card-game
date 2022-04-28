import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BoutModule } from '../bout/bout.module';
import { PlayingCardModule } from '../playing-card/playing-card.module';
import { BattleComponent } from './battle.component';

@NgModule({
  imports: [CommonModule, PlayingCardModule, BoutModule],
  declarations: [BattleComponent],
  exports: [BattleComponent],
})
export class BattleModule {}
