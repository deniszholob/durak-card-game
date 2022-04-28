import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/logic/game.service';

import { ACTION_NAMES } from '../models/game-action.model';
import { Player } from '../models/player.model';
import { CardRank, CardSuit } from '../playing-card/playing-card.enum';
import { PlayingCard } from '../playing-card/playing-card.model';

@Component({
  selector: 'dcg-main',
  templateUrl: './main.component.html',
})
export class MainComponent {
  public readonly ACTION_NAMES = ACTION_NAMES;
  public playerMessage = 'No more attacks allowed';
  public showPreGame = true;

  public playerCards: PlayingCard[] = [
    new PlayingCard({ rank: CardRank.Two, suit: CardSuit.Spade }),
    new PlayingCard({ rank: CardRank.Ten, suit: CardSuit.Diamond }),
    new PlayingCard({}),
  ];

  public manualPlayer?: Player;

  // public testDeck: CardDeck = new CardDeck(MIN_DECK_SIZE, false);
  // public deck: CardDeck = new CardDeck(MIN_DECK_SIZE, true, 'MainComponent');

  // public battles: Battle[] = [
  //   {
  //     attackCard: this.deck.cards[1],
  //   },
  //   {},
  //   {
  //     attackCard: this.deck.cards[1],
  //     defenseCard: this.deck.cards[6],
  //   },
  // ];

  constructor(public gameService: GameService) {
    this.manualPlayer = gameService.getManualPlayer();
  }

  // ngOnInit() {}

  public beginGame() {
    this.showPreGame = false;
    this.gameService.beginGame();
  }

  public getPlayerTrumps(): PlayingCard[] {
    // return this.gameService.playerOrder.map((p) => p.card);
    return this.gameService.players.map((p) => {
      if (!p.lowestStartingCard)
        throw new Error('Lowest Cards where not initialized yet');
      return p.lowestStartingCard;
    });
  }

  public getPlayerFromIndex(i: number): Player {
    return this.gameService.players[i];
  }
}
