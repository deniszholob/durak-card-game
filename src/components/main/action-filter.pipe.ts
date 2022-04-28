import { Pipe, PipeTransform } from '@angular/core';

import {
  ActionBattle,
  ActionCard,
  EBattleActions,
  ECardActions,
  RoundAction,
} from '../models/game-action.model';

@Pipe({
  name: 'actionBattle',
  // pure: false
})
export class ActionBattlePipe implements PipeTransform {
  public transform(items: RoundAction[]): ActionBattle[] {
    return items.filter((a: RoundAction): a is ActionBattle =>
      Object.values(EBattleActions).includes(a.type as EBattleActions)
    );
    // return items ? items.filter((a) => !a.card) : items;
  }
}

@Pipe({
  name: 'actionCard',
  // pure: false
})
export class ActionCardPipe implements PipeTransform {
  public transform(items: RoundAction[]): ActionCard[] {
    return items.filter((a: RoundAction): a is ActionCard =>
      Object.values(ECardActions).includes(a.type as ECardActions)
    );
    // return items ? items.filter((a) => !!a.card) : items;
  }
}
