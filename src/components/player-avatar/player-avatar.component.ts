import { Component, Input } from '@angular/core';

import { Avatars } from './player-avatar.model';

@Component({
  selector: 'dcg-player-avatar',
  templateUrl: './player-avatar.component.html',
})
export class PlayerAvatarComponent {
  @Input()
  public label = 'name';

  @Input()
  public avatar?: Avatars;

  @Input()
  public cardCount = 0;
}
