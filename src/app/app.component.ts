import { Component } from '@angular/core';
import packageJson from '@dcg/package';

import { GameService } from './logic/game.service';

@Component({
  selector: 'dcg-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public appVersion: string | undefined = packageJson?.version;
  constructor(public gameService: GameService) {}
}
