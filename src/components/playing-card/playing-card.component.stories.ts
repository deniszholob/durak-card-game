import { Meta, moduleMetadata, Story } from '@storybook/angular';
import {
  enumToOptionsKeyed,
  enumToOptionsNonKeyed,
} from 'src/utils/storybook-utils/storybook-utils';

import { ECardActions } from '../models/game-action.model';
import { PlayingCardComponent } from './playing-card.component';
import { CardRank, CardSuit } from './playing-card.enum';
import { CardI, PlayingCard as PC } from './playing-card.model';
import { PlayingCardModule } from './playing-card.module';

type ComponentWithCustomControls = PlayingCardComponent &
  CardI & { action: ECardActions };

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Presentation/Playing Card',
  component: PlayingCardComponent,
  decorators: [
    moduleMetadata({
      imports: [PlayingCardModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `Card` } },
  },
  argTypes: {
    actionChange: {
      action: 'actionChange',
      control: { disable: true },
      table: { disable: true },
    },
    action: {
      options: enumToOptionsNonKeyed(ECardActions),
      // mapping: CardActions,
      control: { type: 'select' },
    },
    suit: {
      options: enumToOptionsKeyed(CardSuit),
      // mapping: CardSuit,
      control: { type: 'select' },
    },
    rank: {
      options: enumToOptionsNonKeyed(CardRank),
      // mapping: CardRank,
      control: { type: 'select' },
    },
  },
  args: {
    suit: CardSuit.Club,
    rank: CardRank.Ace,
    isTrump: true,
    action: ECardActions.ATTACK,
  },
};
export default meta;

const Template: Story<ComponentWithCustomControls> = (
  args: ComponentWithCustomControls
) => {
  const card = new PC({
    isTrump: args.isTrump,
    rank: args.rank,
    suit: args.suit,
  });
  return {
    props: {
      ...args,
      card,
      actions: [
        {
          type: args.action,
          card,
          target: PC.getRandomCard(),
        },
      ],
    },
  };
};

export const PlayingCard = Template.bind({});
PlayingCard.args = {};

const TemplateSplit: Story<ComponentWithCustomControls> = (
  args: ComponentWithCustomControls
) => {
  const card = new PC({
    isTrump: args.isTrump,
    rank: args.rank,
    suit: args.suit,
  });
  return {
    props: {
      ...args,
      card,
      actions: [
        {
          type: ECardActions.DEFEND,
          card,
          target: PC.getRandomCard(),
        },
        {
          type: ECardActions.TRANSFER,
          card,
          target: PC.getRandomCard(),
        },
      ],
    },
  };
};
export const PlayingCardSplit = TemplateSplit.bind({});
PlayingCardSplit.args = {};
