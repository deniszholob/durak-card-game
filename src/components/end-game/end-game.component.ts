import { Component } from '@angular/core';
import { GameService } from 'src/app/logic/game.service';

import { Player } from '../models/player.model';

@Component({
  selector: 'dcg-end-game',
  templateUrl: './end-game.component.html',
})
export class EndGameComponent {
  public foolPlayer?: Player;
  constructor(public gameService: GameService) {
    this.foolPlayer = gameService.players.find((p) => p.cards.length > 0);
  }

  public playAgain() {
    this.gameService.newGame();
  }

  // ngOnInit() {}
}
