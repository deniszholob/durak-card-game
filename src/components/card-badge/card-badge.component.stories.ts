import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { CardBadgeComponent } from './card-badge.component';
import { CardBadgeModule } from './card-badge.module';

const meta: Meta<CardBadgeComponent> = {
  title: 'Components/Presentation/Card Badge',
  component: CardBadgeComponent,
  decorators: [
    moduleMetadata({
      imports: [CardBadgeModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `Card Badge` } },
  },
  argTypes: {},
  args: {
    cardCount: 10,
  },
};
export default meta;

const Template: Story<CardBadgeComponent> = (args: CardBadgeComponent) => ({
  props: args,
});

export const CardBadge = Template.bind({});
CardBadge.args = {};
