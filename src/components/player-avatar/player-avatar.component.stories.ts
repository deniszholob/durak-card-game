import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { enumToOptionsKeyed } from 'src/utils/storybook-utils/storybook-utils';

import { PlayerAvatarComponent } from './player-avatar.component';
import { Avatars } from './player-avatar.model';
import { PlayerAvatarModule } from './player-avatar.module';

const meta: Meta<PlayerAvatarComponent> = {
  title: 'Components/Presentation/Player Avatar',
  component: PlayerAvatarComponent,
  decorators: [
    moduleMetadata({
      imports: [PlayerAvatarModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `PlayerAvatarComponent` } },
  },
  argTypes: {
    avatar: {
      options: ['---', ...enumToOptionsKeyed(Avatars)],
      mapping: { '---': undefined },
      control: { type: 'select' },
    },
    cardCount: {
      control: { type: 'range', min: 1, max: 30 },
    },
  },
  args: {
    label: 'name',
    avatar: undefined,
    cardCount: 6,
  },
};
export default meta;

const Template: Story<PlayerAvatarComponent> = (
  args: PlayerAvatarComponent
) => ({
  props: args,
});

export const PlayerAvatar = Template.bind({});
PlayerAvatar.args = {};
