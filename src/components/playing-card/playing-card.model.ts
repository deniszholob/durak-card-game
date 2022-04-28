import {
  arrayIntersection,
  randomEnum,
} from 'src/utils/array-functions/array-functions';

import {
  CardColor,
  CardColors,
  CardRank,
  CardRankString,
  CardSuit,
  CardSuitOrder,
  CardSuitString,
} from './playing-card.enum';

export type CardComparator = (a: PlayingCard, b: PlayingCard) => number;
export interface CardI {
  suit: CardSuit;
  rank: CardRank;
  isTrump: boolean;
}

export class PlayingCard implements CardI {
  private _suit: CardSuit = CardSuit.Heart;
  private _rank: CardRank = CardRank.Ace;
  private _isTrump: boolean = false;

  constructor(card: Partial<CardI>) {
    this._suit = card.suit ?? this._suit;
    this._rank = card.rank ?? this._rank;
    this._isTrump = card.isTrump ?? this._isTrump;
  }

  public get suit(): CardSuit {
    return this._suit;
  }
  public get rank(): CardRank {
    return this._rank;
  }
  public get isTrump(): boolean {
    return this._isTrump;
  }
  public get color(): CardColor {
    return CardColors[this._suit];
  }

  public get suitString(): string {
    return CardSuitString[this.suit];
  }
  public get rankString(): string {
    return CardRankString[this.rank];
  }

  public setTrumpSuit(trumpSuit: CardSuit): void {
    this._isTrump = this._suit === trumpSuit;
  }

  /** Friendly string representation */
  public toString(): string {
    return `${this.isTrump ? '*' : ''}${CardSuitString[this.suit]} ${
      CardRankString[this.rank]
    }`;
  }

  /** JSON representation */
  public stringify(): string {
    const iCard: CardI = {
      rank: this.rank,
      suit: this.suit,
      isTrump: this.isTrump,
    };
    return JSON.stringify(iCard);
  }

  public isEqual(card: PlayingCard): boolean {
    return (
      this.rank === card.rank &&
      this.suit === card.suit &&
      this.isTrump === card.isTrump
    );
  }

  public static getRandomCard(): PlayingCard {
    return new PlayingCard({
      isTrump: !!Math.floor(Math.random() * 2),
      rank: randomEnum(CardRank),
      suit: randomEnum(CardSuit),
    });
  }

  /** @return cards in cardSet that match face value (rank) of cards in cardPoolSet */
  public static findMatchingFaceCards(
    cardSet: PlayingCard[],
    cardPoolSet: PlayingCard[]
  ): PlayingCard[] {
    return arrayIntersection(
      cardSet,
      cardPoolSet,
      (a: PlayingCard, b: PlayingCard): boolean => a.rank === b.rank
    );
  }

  /**
   * @return cards in cardSet that can be used to defend against cards in cardPoolSet:
   * For each card in cardPoolSet, see all the cards in cardSet that can be used for defense
   * Then Set the array to only hold unique cards
   * TODO: make this a valid bout instead since we need targets too?
   */
  public static findCardsThatBeatOthers(
    cardSet: PlayingCard[],
    cardPoolSet: PlayingCard[]
  ): PlayingCard[] {
    return arrayIntersection(
      cardSet,
      cardPoolSet,
      (defenseCard: PlayingCard, attackCard: PlayingCard): boolean =>
        PlayingCard.compareBout(attackCard, defenseCard)
    );
  }

  // public static getValidBouts(
  //   availableCards: PlayingCard[],
  //   battleCards: PlayingCard[]
  // ) {
  //   availableCards.filter(c => if c beats some card in battleCards)
  // }

  public static findPossibleAttackTargets(
    defenseCard: PlayingCard,
    cardPoolSet: PlayingCard[]
  ): PlayingCard[] {
    return cardPoolSet.filter((c: PlayingCard): boolean =>
      PlayingCard.compareBout(c, defenseCard)
    );
  }

  /** @returns true if B beats A; false if A beats B */
  public static compareBout(a: PlayingCard, b: PlayingCard): boolean {
    // Different suit card cannot beat another suit card: always return false for suit mismatch
    const suitMismatchCompare: CardComparator = (): number => 0;
    return this.getCompare(suitMismatchCompare)(a, b) > 0;
  }

  /** @returns 1 if B > A; -1 if A > B; 0 if equal */
  public static getCompareSort(
    groupBy: 'rank' | 'suit' = 'suit',
    direction: 'asc' | 'des' = 'des'
  ): CardComparator {
    const suitMismatchCompare: CardComparator =
      groupBy === 'rank' ? this.compareRank : this.compareSuit;
    const directionMultiplier: number = direction === 'des' ? 1 : -1;
    return (a: PlayingCard, b: PlayingCard): number =>
      // Note: Need the || 0 to convert -0 to 0
      this.getCompare(suitMismatchCompare)(a, b) * directionMultiplier || 0;
  }

  /** @returns 1 if B is only trump, -1 if A is only trump, compares rank with equal suits, and uses passed in comparator for mismatched suits */
  public static getCompare(
    suitMismatchCompare: CardComparator
  ): CardComparator {
    return (a: PlayingCard, b: PlayingCard): number => {
      if (b.isTrump && !a.isTrump) return 1;
      if (!b.isTrump && a.isTrump) return -1;
      if (b.suit === a.suit) return this.compareRank(a, b);
      return suitMismatchCompare(a, b);
    };
  }

  /**
   * Suits compared by custom suit order, NOT alphabetically!
   * @returns 1 if suit B > A; -1 if suit A < B;  if equal suits */
  private static compareSuit(a: PlayingCard, b: PlayingCard): number {
    // return a.suit.localeCompare(b.suit);
    return CardSuitOrder[b.suit] !== CardSuitOrder[a.suit]
      ? CardSuitOrder[b.suit] > CardSuitOrder[a.suit]
        ? 1
        : -1
      : 0;
  }

  /** @returns 1 if rank B > A; -1 if rank A > B; 0 if equal ranks*/
  private static compareRank(a: PlayingCard, b: PlayingCard): number {
    return Math.sign(b.rank - a.rank);
  }
}
