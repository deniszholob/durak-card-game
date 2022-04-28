import { MAX_DECK_SIZE, MAX_HAND_SIZE } from 'src/app/logic/config.const';

import {
  CardRank,
  CardSuit,
  RANKS,
  SUITS,
} from '../playing-card/playing-card.enum';
import { PlayingCard } from '../playing-card/playing-card.model';

/** Top deck = [0], Bottom deck = [length] */
export class CardDeck {
  public readonly cards: PlayingCard[];
  public readonly trumpCard: PlayingCard;

  constructor(
    private deckSize: number = MAX_DECK_SIZE,
    shuffle: boolean = true
  ) {
    this.cards = this.freshDeck();
    if (shuffle) this.shuffle();
    this.trumpCard = this.bottomCard
      ? new PlayingCard(this.bottomCard)
      : PlayingCard.getRandomCard();
    this.trumpCard.setTrumpSuit(this.trumpCard.suit);
    this.cards.forEach((c: PlayingCard): void =>
      c.setTrumpSuit(this.trumpCard.suit)
    );
  }

  private get numberOfCards(): number {
    return this.cards.length;
  }
  // private get topCard(): PlayingCard {
  //   return this.cards[0];
  // }
  public get bottomCard(): PlayingCard | undefined {
    // Undefined if no cards
    return this.cards[this.cards.length - 1];
  }

  private freshDeck(): PlayingCard[] {
    // console.log(`CardRank`, CardRank);
    // console.log(`CardRankString`, CardRankString);
    // console.log(`CardSuitString`, CardSuitString);
    // console.log(`SUITS`, SUITS);
    // console.log(`RANKS`, RANKS);
    // console.log(RANKS.length * SUITS.length);
    if (this.deckSize < 4) {
      return [];
    }
    return SUITS.flatMap((suit: CardSuit): PlayingCard[] =>
      RANKS.filter((_: CardRank, i: number): boolean => {
        const maxRanks: number = this.deckSize / SUITS.length; // 52 => 13, 36 => 9
        const maxRank: number = RANKS.length - maxRanks; // 13 - 13 = 0, 13 - 9 = 4

        return i >= maxRank; // 13
      }).map((rank: CardRank): PlayingCard => new PlayingCard({ suit, rank }))
    );
  }

  // private pop(): PlayingCard {
  //   const card = this.cards.shift();
  //   if (card) return card;
  //   throw Error("Deck empty");
  // }

  // private push(card: PlayingCard): void {
  //   this.cards.push(card);
  // }

  /** @see https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle */
  private shuffle(): void {
    for (let i: number = this.numberOfCards - 1; i > 0; i--) {
      const newIndex: number = Math.floor(Math.random() * (i + 1));
      if (i === newIndex) {
        i++;
        continue;
      }
      const oldValue: PlayingCard = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }

  public dealCards(n: number = MAX_HAND_SIZE): PlayingCard[] {
    return this.cards.splice(0, n);
  }

  public toString(): string {
    return JSON.stringify(this.cards, null, 2);
  }
}
