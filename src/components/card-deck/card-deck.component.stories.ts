import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { CardDeckComponent } from './card-deck.component';
import { CardDeck as Deck } from './card-deck.model';
import { CardDeckModule } from './card-deck.module';

type ComponentWithCustomControls = CardDeckComponent & { cardCount: number };

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Presentation/Card Deck',
  component: CardDeckComponent,
  decorators: [
    moduleMetadata({
      imports: [CardDeckModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `Card` } },
  },
  argTypes: {
    cardCount: {
      control: { type: 'range', min: 0, max: 52, step: 4 },
    },
  },
  args: {
    cardCount: 32,
    spread: false,
  },
};
export default meta;

const Template: Story<ComponentWithCustomControls> = (
  args: ComponentWithCustomControls
) => ({
  props: {
    ...args,
    deck: new Deck(args.cardCount),
  },
});

export const CardDeck = Template.bind({});
CardDeck.args = {};
