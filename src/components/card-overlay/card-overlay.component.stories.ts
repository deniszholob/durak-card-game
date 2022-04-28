import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { PlayingCard } from '../playing-card/playing-card.model';
import { CardOverlayComponent } from './card-overlay.component';
import { Overlay } from './card-overlay.model';
import { CardOverlayModule } from './card-overlay.module';

type ComponentWithCustomControls = CardOverlayComponent & Overlay;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Presentation/Card Overlay',
  component: CardOverlayComponent,
  decorators: [
    moduleMetadata({
      imports: [CardOverlayModule],
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
  },
  args: {
    color: 'red',
    text: 'Attack',
    overlayPosition: 'full',
    textPosition: 'bottom',
  },
};
export default meta;

const Template: Story<ComponentWithCustomControls> = (
  args: ComponentWithCustomControls
) => ({
  props: {
    ...args,
    cardOverlay: {
      color: args.color,
      text: args.text,
      overlayPosition: args.overlayPosition,
      textPosition: args.textPosition,
      action: {
        type: 0,
        card: PlayingCard.getRandomCard(),
        target: PlayingCard.getRandomCard(),
      },
    },
  },
});

export const CardOverlay = Template.bind({});
CardOverlay.args = {};
