import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { InfoBarComponent } from './info-bar.component';
import { InfoBarModule } from './info-bar.module';

type ComponentWithCustomControls = InfoBarComponent & { text: string };

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Presentation/Info Bar',
  component: InfoBarComponent,
  decorators: [
    moduleMetadata({
      imports: [InfoBarModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `Info Bar` } },
  },
  argTypes: {},
  args: {
    text: 'Info Message',
  },
};
export default meta;

const Template: Story<ComponentWithCustomControls> = (
  args: ComponentWithCustomControls
) => ({
  props: args,
  template: `<dcg-info-bar>{{text}}</dcg-info-bar>`,
});

export const InfoBar = Template.bind({});
InfoBar.args = {};
