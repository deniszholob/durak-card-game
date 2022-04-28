import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { GameService } from 'src/app/logic/game.service';

import { MainComponent } from './main.component';
import { MainModule } from './main.module';

const meta: Meta<MainComponent> = {
  title: 'Components/Smart/Main',
  component: MainComponent,
  decorators: [
    moduleMetadata({
      imports: [MainModule],
      providers: [GameService],
    }),
  ],
  parameters: {
    docs: { description: { component: `End Game` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

const Template: Story<MainComponent> = (args: MainComponent) => ({
  props: {
    ...args,
  },
});

export const Main = Template.bind({});
Main.args = {};
