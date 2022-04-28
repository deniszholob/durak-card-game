import {
  ActionBattle,
  ActionCard,
  EBattleActions,
  ECardActions,
  RoundAction,
} from '../models/game-action.model';
import { PlayingCard } from '../playing-card/playing-card.model';
import { ActionBattlePipe, ActionCardPipe } from './action-filter.pipe';

describe('ActionCardPipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  const actionCardPipe = new ActionCardPipe();
  const battleCardPipe = new ActionBattlePipe();

  const items: RoundAction[] = [
    {
      type: EBattleActions.TAKE,
      card: null,
      target: null,
    },
    {
      type: ECardActions.DEFEND,
      card: PlayingCard.getRandomCard(),
      target: null,
    },
  ];

  it('transforms Action to CardAction', () => {
    const cardList: ActionCard[] = actionCardPipe.transform(items);
    expect(cardList.length).toBe(1);
    expect(cardList).toStrictEqual([items[1]]);
  });

  it('transforms Action to BattleAction', () => {
    const cardList: ActionBattle[] = battleCardPipe.transform(items);
    expect(cardList.length).toBe(1);
    expect(cardList).toStrictEqual([items[0]]);
  });
});
