import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InfoBarModule } from '../info-bar/info-bar.module';
import { PlayerAvatarModule } from '../player-avatar/player-avatar.module';
import { EndGameComponent } from './end-game.component';

@NgModule({
  imports: [CommonModule, PlayerAvatarModule, InfoBarModule],
  declarations: [EndGameComponent],
  exports: [EndGameComponent],
})
export class EndGameModule {}
