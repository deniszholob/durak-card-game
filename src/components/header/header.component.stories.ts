import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { GameService } from 'src/app/logic/game.service';

import { HeaderComponent } from './header.component';
import { HeaderModule } from './header.module';

const meta: Meta<HeaderComponent> = {
  title: 'Components/Smart/Header',
  component: HeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [HeaderModule],
      providers: [GameService],
    }),
  ],
  parameters: {
    docs: { description: { component: `Header` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

const Template: Story<HeaderComponent> = (args: HeaderComponent) => ({
  props: args,
});

export const Header = Template.bind({});
Header.args = {};
