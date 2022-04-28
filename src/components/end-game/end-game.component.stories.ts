import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { GameService } from 'src/app/logic/game.service';

import { PlayerType } from '../models/player.model';
import { Avatars } from '../player-avatar/player-avatar.model';
import { PlayingCard } from '../playing-card/playing-card.model';
import { EndGameComponent } from './end-game.component';
import { EndGameModule } from './end-game.module';

type ComponentWithCustomControls = EndGameComponent & { tie: boolean };

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Smart/End Game',
  component: EndGameComponent,
  decorators: [
    moduleMetadata({
      imports: [EndGameModule],
      providers: [GameService],
    }),
  ],
  parameters: {
    docs: { description: { component: `End Game` } },
  },
  argTypes: {},
  args: {
    tie: true,
  },
};
export default meta;

const Template: Story<ComponentWithCustomControls> = (
  args: ComponentWithCustomControls
) => ({
  props: {
    ...args,
    foolPlayer: args.tie
      ? undefined
      : {
          id: 1,
          type: PlayerType.AI,
          label: 'Bee',
          cards: [PlayingCard.getRandomCard()],
          avatar: Avatars.bee,
        },
    // cards: Array.from({ length: args.cardCount }, () =>
    //   PlayingCard.getRandomCard()
    // ),
  },
});

export const EndGame = Template.bind({});
EndGame.args = {};
