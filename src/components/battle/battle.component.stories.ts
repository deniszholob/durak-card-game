import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { PlayingCard } from '../playing-card/playing-card.model';
import { BattleComponent } from './battle.component';
import { BattleModule } from './battle.module';

const meta: Meta<BattleComponent> = {
  title: 'Components/Presentation/Battle',
  component: BattleComponent,
  decorators: [
    moduleMetadata({
      imports: [BattleModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `Card Badge` } },
  },
  argTypes: {},
  args: {
    battle: [
      {
        attackCard: PlayingCard.getRandomCard(),
        defenseCard: PlayingCard.getRandomCard(),
      },
      {
        attackCard: PlayingCard.getRandomCard(),
      },
      {
        attackCard: PlayingCard.getRandomCard(),
        defenseCard: PlayingCard.getRandomCard(),
      },
      {
        defenseCard: PlayingCard.getRandomCard(),
      },
    ],
  },
};
export default meta;

const Template: Story<BattleComponent> = (args: BattleComponent) => ({
  props: args,
});

export const Battle = Template.bind({});
Battle.args = {};
