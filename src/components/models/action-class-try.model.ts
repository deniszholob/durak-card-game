import {
  EBattleActions,
  ECardActions,
  TurnActions,
} from 'src/components/models/game-action.model';
import { PlayingCard } from 'src/components/playing-card/playing-card.model';

import { Player } from './player.model';

abstract class Action {
  constructor(public type: TurnActions) {}
  public abstract executeAction(player: Player): void;
}

class ActionBattle extends Action {
  constructor(public override type: EBattleActions) {
    super(type);
  }
  public executeAction(player: Player): void {
    throw new Error('Method not implemented.');
  }
}

abstract class ActionCard extends Action {
  constructor(public override type: ECardActions, public card: PlayingCard) {
    super(type);
  }
}

class ActionCardDefend extends ActionCard {
  constructor(
    public override type: ECardActions,
    public override card: PlayingCard,
    public target: PlayingCard
  ) {
    super(type, card);
  }

  public executeAction(player: Player): void {
    throw new Error('Method not implemented.');
  }
}

class ActionCardAttack extends ActionCard {
  constructor(
    public override type: ECardActions,
    public override card: PlayingCard
  ) {
    super(type, card);
  }

  public executeAction(player: Player): void {
    throw new Error('Method not implemented.');
  }
}
