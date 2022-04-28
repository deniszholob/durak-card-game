import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { SwitchComponent } from './switch.component';
import { SwitchModule } from './switch.module';

const meta: Meta<SwitchComponent> = {
  title: 'Components/Presentation/Switch',
  component: SwitchComponent,
  decorators: [
    moduleMetadata({
      imports: [SwitchModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `SwitchComponent` } },
  },
  argTypes: {
    statusChange: {
      action: 'statusChange',
      control: { disable: true },
      table: { disable: true },
    },
  },
  args: {
    text: '',
  },
};
export default meta;

const Template: Story<SwitchComponent> = (args: SwitchComponent) => ({
  props: args,
});

export const Switch = Template.bind({});
Switch.args = {};
