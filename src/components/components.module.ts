import { NgModule } from '@angular/core';

import { CardBadgeModule } from './card-badge/card-badge.module';
import { CardDeckModule } from './card-deck/card-deck.module';
import { EndGameModule } from './end-game/end-game.module';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { MainModule } from './main/main.module';
import { PlayerAvatarModule } from './player-avatar/player-avatar.module';
import { PlayingCardModule } from './playing-card/playing-card.module';
import { SwitchModule } from './switch/switch.module';

@NgModule({
  exports: [
    FooterModule,
    PlayingCardModule,
    MainModule,
    HeaderModule,
    SwitchModule,
    PlayerAvatarModule,
    CardBadgeModule,
    CardDeckModule,
    EndGameModule,
  ],
})
export class ComponentsModule {}
