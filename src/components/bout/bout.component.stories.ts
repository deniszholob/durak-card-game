import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { PlayingCard } from '../playing-card/playing-card.model';
import { BoutComponent } from './bout.component';
import { BoutModule } from './bout.module';

const meta: Meta<BoutComponent> = {
  title: 'Components/Presentation/Bout',
  component: BoutComponent,
  decorators: [
    moduleMetadata({
      imports: [BoutModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `Bout` } },
  },
  argTypes: {},
  args: {
    bout: {
      attackCard: PlayingCard.getRandomCard(),
      defenseCard: PlayingCard.getRandomCard(),
    },
  },
};
export default meta;

const Template: Story<BoutComponent> = (args: BoutComponent) => ({
  props: args,
});

export const Bout = Template.bind({});
Bout.args = {};
