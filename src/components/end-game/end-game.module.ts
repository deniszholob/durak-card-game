import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PlayerAvatarModule } from '../player-avatar/player-avatar.module';
import { EndGameComponent } from './end-game.component';

@NgModule({
  imports: [CommonModule, PlayerAvatarModule],
  declarations: [EndGameComponent],
  exports: [EndGameComponent],
})
export class EndGameModule {}
