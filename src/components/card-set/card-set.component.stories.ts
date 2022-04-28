import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { PlayingCard } from '../playing-card/playing-card.model';
import { CardSetComponent } from './card-set.component';
import { CardSetModule } from './card-set.module';

type ComponentWithCustomControls = CardSetComponent & { cardCount: number };

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Presentation/Card Set',
  component: CardSetComponent,
  decorators: [
    moduleMetadata({
      imports: [CardSetModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `Card` } },
  },
  argTypes: {
    cardCount: {
      control: { type: 'range', min: 1, max: 30 },
    },
  },
  args: {
    cardCount: 20,
  },
};
export default meta;

const Template: Story<ComponentWithCustomControls> = (
  args: ComponentWithCustomControls
) => ({
  props: {
    ...args,
    cards: Array.from({ length: args.cardCount }, () =>
      PlayingCard.getRandomCard()
    ),
  },
});

export const CardSet = Template.bind({});
CardSet.args = {};
