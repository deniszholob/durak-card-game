import { Battle } from 'src/components/battle/battle.model';
import { CardDeck } from 'src/components/card-deck/card-deck.model';
import { Player } from 'src/components/models/player.model';
import { PlayingCard } from 'src/components/playing-card/playing-card.model';

export interface GameState {
  deck: CardDeck;
  discardHeap: PlayingCard[];
  players: Player[];
  currentPlayerIndex: number;
  attackerIdx: number;
  defenderIdx: number;
  battle: Battle;
}
