import { Component } from '@angular/core';
import { GameService } from 'src/app/logic/game.service';

@Component({
  selector: 'dcg-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public title = 'Game';

  constructor(public gameService: GameService) {}

  // ngOnInit() {}

  public newGame(): void {
    this.gameService.newGame();
  }

  public endGame(): void {
    this.gameService.endGame();
  }
}
