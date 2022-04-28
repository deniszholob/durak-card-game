export enum CardColor {
  Black = 'black',
  Red = 'red',
  Green = 'green',
  Yellow = 'yellow',
}

export enum CardRank {
  Two = 2,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King,
  Ace,
}

export enum CardSuit {
  Club = 'C',
  Diamond = 'D',
  Heart = 'H',
  Spade = 'S',
}

export const CardRankString: Record<CardRank, string> = {
  [CardRank.Two]: '2',
  [CardRank.Three]: '3',
  [CardRank.Four]: '4',
  [CardRank.Five]: '5',
  [CardRank.Six]: '6',
  [CardRank.Seven]: '7',
  [CardRank.Eight]: '8',
  [CardRank.Nine]: '9',
  [CardRank.Ten]: '10',
  [CardRank.Jack]: 'J',
  [CardRank.Queen]: 'Q',
  [CardRank.King]: 'K',
  [CardRank.Ace]: 'A',
};

export const CardSuitString: Record<CardSuit, string> = {
  [CardSuit.Club]: '♣',
  [CardSuit.Diamond]: '♦',
  [CardSuit.Heart]: '♥',
  [CardSuit.Spade]: '♠',
};

export const SUITS: CardSuit[] = Object.values(CardSuit);
export const RANKS: CardRank[] = Object.values(CardRank)
  .filter((v) => typeof v !== 'string')
  .map((v) => Number(v));

export const CardSuitOrder: Record<CardSuit, number> = {
  [CardSuit.Club]: 1,
  [CardSuit.Diamond]: 2,
  [CardSuit.Spade]: 3,
  [CardSuit.Heart]: 4,
};

export const CardColors: Record<CardSuit, CardColor> = {
  [CardSuit.Club]: CardColor.Black,
  [CardSuit.Diamond]: CardColor.Red,
  [CardSuit.Spade]: CardColor.Black,
  [CardSuit.Heart]: CardColor.Red,
};

export const CardColors2: Record<CardSuit, CardColor> = {
  [CardSuit.Club]: CardColor.Green,
  [CardSuit.Diamond]: CardColor.Yellow,
  [CardSuit.Spade]: CardColor.Black,
  [CardSuit.Heart]: CardColor.Red,
};
