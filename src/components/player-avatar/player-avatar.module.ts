import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PlayerAvatarComponent } from './player-avatar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PlayerAvatarComponent],
  exports: [PlayerAvatarComponent],
})
export class PlayerAvatarModule {}
