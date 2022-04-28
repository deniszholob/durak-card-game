import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BattleModule } from '../battle/battle.module';
import { BoutModule } from '../bout/bout.module';
import { CardDeckModule } from '../card-deck/card-deck.module';
import { CardSetModule } from '../card-set/card-set.module';
import { PlayerAvatarModule } from '../player-avatar/player-avatar.module';
import { PlayingCardModule } from '../playing-card/playing-card.module';
import { ActionBattlePipe, ActionCardPipe } from './action-filter.pipe';
import { MainComponent } from './main.component';

@NgModule({
  imports: [
    CommonModule,
    PlayingCardModule,
    PlayerAvatarModule,
    CardDeckModule,
    BattleModule,
    BoutModule,
    CardSetModule,
  ],
  declarations: [MainComponent, ActionCardPipe, ActionBattlePipe],
  exports: [MainComponent],
})
export class MainModule {}
