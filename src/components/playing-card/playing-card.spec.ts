import {
  ArrayComparator,
  arrayIntersection,
} from 'src/utils/array-functions/array-functions';

import { CardRank } from './playing-card.enum';
import { PlayingCard } from './playing-card.model';

describe('Array Functions', () => {
  interface I {
    id: string;
    label: string;
  }

  const comparatorN: ArrayComparator<number> = (a, b) => a === b;
  const comparatorI: ArrayComparator<I> = (a, b) =>
    a.id === b.id && a.label === b.label;

  it('card test', () => {
    const availableCards: PlayingCard[] = [
      new PlayingCard({ rank: CardRank.Ace }),
      new PlayingCard({ rank: CardRank.Three }),
      new PlayingCard({ rank: CardRank.Four }),
      new PlayingCard({ rank: CardRank.Five }),
    ];
    const boutCards: PlayingCard[] = [
      new PlayingCard({ rank: CardRank.Ace }),
      new PlayingCard({ rank: CardRank.Two }),
      new PlayingCard({ rank: CardRank.Five }),
    ];
    const validCards: PlayingCard[] = [
      new PlayingCard({ rank: CardRank.Ace }),
      new PlayingCard({ rank: CardRank.Five }),
    ];

    const comparatorC: ArrayComparator<PlayingCard> = (a, b) =>
      a.rank === b.rank;

    expect(
      arrayIntersection(availableCards, boutCards, comparatorC)
    ).toStrictEqual(validCards);
  });
});
