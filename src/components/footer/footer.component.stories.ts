import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { FooterComponent } from './footer.component';
import { FooterModule } from './footer.module';

const meta: Meta<FooterComponent> = {
  title: 'Components/Presentation/Footer',
  component: FooterComponent,
  decorators: [
    moduleMetadata({
      imports: [FooterModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `Footer` } },
  },
  argTypes: {},
  args: {
    version: '0.0.0',
  },
};
export default meta;

const Template: Story<FooterComponent> = (args: FooterComponent) => ({
  props: args,
});

export const Footer = Template.bind({});
Footer.args = {};
