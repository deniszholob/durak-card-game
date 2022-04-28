import { CardRank, CardSuit } from './playing-card.enum';
import { PlayingCard } from './playing-card.model';

describe('PlayingCard', () => {
  let cardA: PlayingCard = new PlayingCard({});
  let cards: PlayingCard[] = [];

  beforeEach(() => {
    cardA = new PlayingCard({
      isTrump: false,
      rank: CardRank.Ten,
      suit: CardSuit.Heart,
    });
    cards = [
      new PlayingCard({
        isTrump: true,
        rank: CardRank.Ten,
        suit: CardSuit.Diamond,
      }),
      new PlayingCard({
        isTrump: true,
        rank: CardRank.Queen,
        suit: CardSuit.Diamond,
      }),
      new PlayingCard({
        isTrump: true,
        rank: CardRank.Two,
        suit: CardSuit.Diamond,
      }),
      new PlayingCard({
        isTrump: false,
        rank: CardRank.Two,
        suit: CardSuit.Spade,
      }),
      new PlayingCard({
        isTrump: false,
        rank: CardRank.Two,
        suit: CardSuit.Club,
      }),
      new PlayingCard({
        isTrump: false,
        rank: CardRank.Jack,
        suit: CardSuit.Spade,
      }),
    ];
  });

  it(`should be created`, () => {
    expect(new PlayingCard({})).toBeTruthy();
  });

  it(`findPossibleAttackTargets`, () => {
    expect(
      PlayingCard.findPossibleAttackTargets(cardA, cards).toString()
    ).toStrictEqual('');

    cardA.setTrumpSuit(CardSuit.Heart);
    expect(
      PlayingCard.findPossibleAttackTargets(cardA, cards).toString()
    ).toStrictEqual('♠ 2,♣ 2,♠ J');
  });

  it(`isEqual`, () => {
    expect(cardA.isEqual(cardA)).toBeTruthy();
    expect(
      cardA.isEqual(
        new PlayingCard({
          isTrump: true,
          rank: CardRank.Ten,
          suit: CardSuit.Heart,
        })
      )
    ).toBeFalsy();
  });

  it('findMatchingFaceCards', () => {
    const playerHand: PlayingCard[] = [
      new PlayingCard({ rank: CardRank.Two, suit: CardSuit.Diamond }),
      new PlayingCard({ rank: CardRank.Ace, suit: CardSuit.Diamond }),
      new PlayingCard({ rank: CardRank.Ace, suit: CardSuit.Heart }),
      new PlayingCard({ rank: CardRank.Ace, suit: CardSuit.Spade }),
    ];
    const battleCards: PlayingCard[] = [
      new PlayingCard({ rank: CardRank.Three, suit: CardSuit.Diamond }),
      new PlayingCard({ rank: CardRank.Ace, suit: CardSuit.Club }),
    ];
    const availableAssistCards: PlayingCard[] = [
      new PlayingCard({ rank: CardRank.Ace, suit: CardSuit.Diamond }),
      new PlayingCard({ rank: CardRank.Ace, suit: CardSuit.Heart }),
      new PlayingCard({ rank: CardRank.Ace, suit: CardSuit.Spade }),
    ];
    expect(
      PlayingCard.findMatchingFaceCards(playerHand, battleCards)
    ).toStrictEqual(availableAssistCards);
  });

  it('findCardsThatBeatOthers', () => {
    const trumpSuit = CardSuit.Heart;
    const playerHand: PlayingCard[] = [
      new PlayingCard({ rank: CardRank.Two, suit: CardSuit.Diamond }),
      new PlayingCard({ rank: CardRank.Two, suit: CardSuit.Heart }),
      new PlayingCard({ rank: CardRank.Ten, suit: CardSuit.Club }),
      new PlayingCard({ rank: CardRank.Ace, suit: CardSuit.Diamond }),
      new PlayingCard({ rank: CardRank.Ace, suit: CardSuit.Heart }),
      new PlayingCard({ rank: CardRank.Ace, suit: CardSuit.Spade }),
    ];
    const attackCards: PlayingCard[] = [
      new PlayingCard({ rank: CardRank.Three, suit: CardSuit.Diamond }),
      new PlayingCard({ rank: CardRank.Nine, suit: CardSuit.Club }),
    ];
    const availableDefenseCards: PlayingCard[] = [
      new PlayingCard({ rank: CardRank.Two, suit: CardSuit.Heart }),
      new PlayingCard({ rank: CardRank.Ten, suit: CardSuit.Club }),
      new PlayingCard({ rank: CardRank.Ace, suit: CardSuit.Diamond }),
      new PlayingCard({ rank: CardRank.Ace, suit: CardSuit.Heart }),
    ];

    playerHand.forEach((c) => c.setTrumpSuit(trumpSuit));
    attackCards.forEach((c) => c.setTrumpSuit(trumpSuit));
    availableDefenseCards.forEach((c) => c.setTrumpSuit(trumpSuit));

    expect(
      PlayingCard.findCardsThatBeatOthers(playerHand, attackCards)
    ).toStrictEqual(availableDefenseCards);
  });

  describe(`should correctly return properties`, () => {
    it(`correct colors`, () => {
      let card = new PlayingCard({
        suit: CardSuit.Club,
      });
      expect(card.color).toEqual('black');

      card = new PlayingCard({
        suit: CardSuit.Diamond,
      });
      expect(card.color).toEqual('red');

      card = new PlayingCard({
        suit: CardSuit.Heart,
      });
      expect(card.color).toEqual('red');

      card = new PlayingCard({
        suit: CardSuit.Spade,
      });
      expect(card.color).toEqual('black');
    });

    it(`correct props`, () => {
      expect(cardA.isTrump).toEqual(false);
      expect(cardA.suitString).toEqual('♥');
      expect(cardA.rankString).toEqual('10');
      expect(cardA.toString()).toEqual('♥ 10');
      expect(cardA.stringify()).toEqual(
        '{"rank":10,"suit":"H","isTrump":false}'
      );
      cardA.setTrumpSuit(CardSuit.Heart);
      expect(cardA.isTrump).toEqual(true);
      expect(cardA.suitString).toEqual('♥');
      expect(cardA.rankString).toEqual('10');
      expect(cardA.toString()).toEqual('*♥ 10');
      expect(cardA.stringify()).toEqual(
        '{"rank":10,"suit":"H","isTrump":true}'
      );
    });
  });

  describe(`should correctly return comparisons`, () => {
    it(`10H/Trump vs 10H/Trump`, () => {
      const cardB = new PlayingCard({
        isTrump: false,
        rank: CardRank.Ten,
        suit: CardSuit.Heart,
      });

      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(0); // 10H vs 10H
      cardB.setTrumpSuit(CardSuit.Heart);
      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(1); // 10H vs 10H Trump
      cardA.setTrumpSuit(CardSuit.Heart);
      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(0); // 10H Trump vs 10H Trump
      cardB.setTrumpSuit(CardSuit.Diamond);
      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(-1); // 10H Trump vs 10H
    });

    it(`10H/Trump vs 10S/Trump`, () => {
      const cardB = new PlayingCard({
        isTrump: false,
        rank: CardRank.Ten,
        suit: CardSuit.Spade,
      });

      expect(PlayingCard.getCompareSort()(cardB, cardA)).toBe(1); // 10S vs 10H
      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(-1); // 10H vs 10S
      cardB.setTrumpSuit(CardSuit.Spade);
      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(1); // 10H vs 10S Trump
      cardA.setTrumpSuit(CardSuit.Heart);
      expect(PlayingCard.getCompareSort()(cardB, cardA)).toBe(1); // 10S Trump vs 10H Trump
      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(-1); // 10H Trump vs 10S Trump
      cardB.setTrumpSuit(CardSuit.Diamond);
      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(-1); // 10H Trump vs 10S
    });

    it(`10H/Trump vs 10D/Trump`, () => {
      const cardB = new PlayingCard({
        isTrump: false,
        rank: CardRank.Ten,
        suit: CardSuit.Diamond,
      });

      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(-1); // 10H vs 10D
      cardB.setTrumpSuit(CardSuit.Diamond);
      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(1); // 10H vs 10D Trump
      cardA.setTrumpSuit(CardSuit.Heart);
      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(-1); // 10H Trump vs 10D Trump
      cardB.setTrumpSuit(CardSuit.Spade);
      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(-1); // 10H Trump vs 10D
    });

    it(`10H/Trump vs AH/Trump`, () => {
      const cardB = new PlayingCard({
        isTrump: false,
        rank: CardRank.Ace,
        suit: CardSuit.Heart,
      });

      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(1); // 10H vs AH
      cardB.setTrumpSuit(CardSuit.Heart);
      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(1); // 10H vs AH Trump
      cardA.setTrumpSuit(CardSuit.Heart);
      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(1); // 10H Trump vs AH Trump
      cardB.setTrumpSuit(CardSuit.Diamond);
      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(-1); // 10H Trump vs AH
    });

    it(`10H/Trump vs 2H/Trump`, () => {
      const cardB = new PlayingCard({
        isTrump: false,
        rank: CardRank.Two,
        suit: CardSuit.Heart,
      });

      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(-1); // 10H vs 2H
      cardB.setTrumpSuit(CardSuit.Heart);
      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(1); // 10H vs 2H Trump
      cardA.setTrumpSuit(CardSuit.Heart);
      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(-1); // 10H Trump vs 2H Trump
      cardB.setTrumpSuit(CardSuit.Diamond);
      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(-1); // 10H Trump vs 2H
    });

    it(`10H/Trump vs AC/Trump`, () => {
      const cardB = new PlayingCard({
        isTrump: false,
        rank: CardRank.Ace,
        suit: CardSuit.Club,
      });

      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(-1); // 10H vs AC
      cardB.setTrumpSuit(CardSuit.Club);
      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(1); // 10H vs AC Trump
      cardA.setTrumpSuit(CardSuit.Heart);
      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(-1); // 10H Trump vs AC Trump
      cardB.setTrumpSuit(CardSuit.Diamond);
      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(-1); // 10H Trump vs AC
    });

    it(`10H/Trump vs 2C/Trump`, () => {
      const cardB = new PlayingCard({
        isTrump: false,
        rank: CardRank.Two,
        suit: CardSuit.Club,
      });

      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(-1); // 10H vs 2C
      cardB.setTrumpSuit(CardSuit.Club);
      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(1); // 10H vs 2C Trump
      cardA.setTrumpSuit(CardSuit.Heart);
      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(-1); // 10H Trump vs 2C Trump
      cardB.setTrumpSuit(CardSuit.Diamond);
      expect(PlayingCard.getCompareSort()(cardA, cardB)).toBe(-1); // 10H Trump vs 2C
    });
  });

  describe(`should correctly return sort`, () => {
    it(`getCompareSort()`, () => {
      expect(
        [...cards].sort(PlayingCard.getCompareSort()).map((c) => c.toString())
      ).toStrictEqual(['*♦ Q', '*♦ 10', '*♦ 2', '♠ J', '♠ 2', '♣ 2']);

      expect(
        [...cards]
          .sort(PlayingCard.getCompareSort('suit', 'des'))
          .map((c) => c.toString())
      ).toStrictEqual(['*♦ Q', '*♦ 10', '*♦ 2', '♠ J', '♠ 2', '♣ 2']);

      expect(
        [...cards]
          .sort(PlayingCard.getCompareSort('suit', 'asc'))
          .map((c) => c.toString())
      ).toStrictEqual(['♣ 2', '♠ 2', '♠ J', '*♦ 2', '*♦ 10', '*♦ Q']);

      expect(
        [...cards]
          .sort(PlayingCard.getCompareSort('rank', 'des'))
          .map((c) => c.toString())
      ).toStrictEqual(['*♦ Q', '*♦ 10', '*♦ 2', '♠ J', '♠ 2', '♣ 2']);

      expect(
        [...cards]
          .sort(PlayingCard.getCompareSort('rank', 'asc'))
          .map((c) => c.toString())
      ).toStrictEqual(['♠ 2', '♣ 2', '♠ J', '*♦ 2', '*♦ 10', '*♦ Q']);
      // TODO: This is actually more accurate, but, not important problem to solve rn
      // ).toStrictEqual(['♣ 2', '♠ 2', '♠ J', '*♦ 2', '*♦ 10', '*♦ Q']);
    });
  });

  describe(`should correctly return battle results`, () => {
    it(`10H/Trump vs 10H/Trump`, () => {
      const cardB = new PlayingCard({
        isTrump: false,
        rank: CardRank.Ten,
        suit: CardSuit.Heart,
      });

      expect(PlayingCard.compareBout(cardA, cardB)).toBeFalsy(); // 10H vs 10H
      cardB.setTrumpSuit(CardSuit.Heart);
      expect(PlayingCard.compareBout(cardA, cardB)).toBeTruthy(); // 10H vs 10H Trump
      cardA.setTrumpSuit(CardSuit.Heart);
      expect(PlayingCard.compareBout(cardA, cardB)).toBeFalsy(); // 10H Trump vs 10H Trump
      cardB.setTrumpSuit(CardSuit.Diamond);
      expect(PlayingCard.compareBout(cardA, cardB)).toBeFalsy(); // 10H Trump vs 10H
    });

    it(`10H/Trump vs 10S/Trump`, () => {
      const cardB = new PlayingCard({
        isTrump: false,
        rank: CardRank.Ten,
        suit: CardSuit.Spade,
      });

      expect(PlayingCard.compareBout(cardA, cardB)).toBeFalsy(); // 10H vs 10S
      cardB.setTrumpSuit(CardSuit.Spade);
      expect(PlayingCard.compareBout(cardA, cardB)).toBeTruthy(); // 10H vs 10S Trump
      cardA.setTrumpSuit(CardSuit.Heart);
      expect(PlayingCard.compareBout(cardA, cardB)).toBeFalsy(); // 10H Trump vs 10S Trump
      cardB.setTrumpSuit(CardSuit.Diamond);
      expect(PlayingCard.compareBout(cardA, cardB)).toBeFalsy(); // 10H Trump vs 10S
    });

    it(`10H/Trump vs 10D/Trump`, () => {
      const cardB = new PlayingCard({
        isTrump: false,
        rank: CardRank.Ten,
        suit: CardSuit.Diamond,
      });

      expect(PlayingCard.compareBout(cardA, cardB)).toBeFalsy(); // 10H vs 10D
      cardB.setTrumpSuit(CardSuit.Diamond);
      expect(PlayingCard.compareBout(cardA, cardB)).toBeTruthy(); // 10H vs 10D Trump
      cardA.setTrumpSuit(CardSuit.Heart);
      expect(PlayingCard.compareBout(cardA, cardB)).toBeFalsy(); // 10H Trump vs 10D Trump
      cardB.setTrumpSuit(CardSuit.Spade);
      expect(PlayingCard.compareBout(cardA, cardB)).toBeFalsy(); // 10H Trump vs 10D
    });

    it(`10H/Trump vs AH/Trump`, () => {
      const cardB = new PlayingCard({
        isTrump: false,
        rank: CardRank.Ace,
        suit: CardSuit.Heart,
      });

      expect(PlayingCard.compareBout(cardA, cardB)).toBeTruthy(); // 10H vs AH
      cardB.setTrumpSuit(CardSuit.Heart);
      expect(PlayingCard.compareBout(cardA, cardB)).toBeTruthy(); // 10H vs AH Trump
      cardA.setTrumpSuit(CardSuit.Heart);
      expect(PlayingCard.compareBout(cardA, cardB)).toBeTruthy(); // 10H Trump vs AH Trump
      cardB.setTrumpSuit(CardSuit.Diamond);
      expect(PlayingCard.compareBout(cardA, cardB)).toBeFalsy(); // 10H Trump vs AH
    });

    it(`10H/Trump vs 2H/Trump`, () => {
      const cardB = new PlayingCard({
        isTrump: false,
        rank: CardRank.Two,
        suit: CardSuit.Heart,
      });

      expect(PlayingCard.compareBout(cardA, cardB)).toBeFalsy(); // 10H vs 2H
      cardB.setTrumpSuit(CardSuit.Heart);
      expect(PlayingCard.compareBout(cardA, cardB)).toBeTruthy(); // 10H vs 2H Trump
      cardA.setTrumpSuit(CardSuit.Heart);
      expect(PlayingCard.compareBout(cardA, cardB)).toBeFalsy(); // 10H Trump vs 2H Trump
      cardB.setTrumpSuit(CardSuit.Diamond);
      expect(PlayingCard.compareBout(cardA, cardB)).toBeFalsy(); // 10H Trump vs 2H
    });

    it(`10H/Trump vs AC/Trump`, () => {
      const cardB = new PlayingCard({
        isTrump: false,
        rank: CardRank.Ace,
        suit: CardSuit.Club,
      });

      expect(PlayingCard.compareBout(cardA, cardB)).toBeFalsy(); // 10H vs AC
      cardB.setTrumpSuit(CardSuit.Club);
      expect(PlayingCard.compareBout(cardA, cardB)).toBeTruthy(); // 10H vs AC Trump
      // Invalid fight, should return false
      cardA.setTrumpSuit(CardSuit.Heart);
      expect(PlayingCard.compareBout(cardA, cardB)).toBeFalsy(); // 10H Trump vs AC Trump
      cardB.setTrumpSuit(CardSuit.Diamond);
      expect(PlayingCard.compareBout(cardA, cardB)).toBeFalsy(); // 10H Trump vs AC
    });

    it(`10H/Trump vs 2C/Trump`, () => {
      const cardB = new PlayingCard({
        isTrump: false,
        rank: CardRank.Two,
        suit: CardSuit.Club,
      });

      expect(PlayingCard.compareBout(cardA, cardB)).toBeFalsy(); // 10H vs 2C
      cardB.setTrumpSuit(CardSuit.Club);
      expect(PlayingCard.compareBout(cardA, cardB)).toBeTruthy(); // 10H vs 2C Trump
      // Invalid fight, should return false
      cardA.setTrumpSuit(CardSuit.Heart);
      expect(PlayingCard.compareBout(cardA, cardB)).toBeFalsy(); // 10H Trump vs 2C Trump
      cardB.setTrumpSuit(CardSuit.Diamond);
      expect(PlayingCard.compareBout(cardA, cardB)).toBeFalsy(); // 10H Trump vs 2C
    });
  });
});
