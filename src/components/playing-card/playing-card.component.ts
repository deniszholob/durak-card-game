import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {
  CardOverlay,
  OVERLAY_DETAILS,
} from '../card-overlay/card-overlay.model';
import { ActionCard, ECardActions } from '../models/game-action.model';
import { PlayingCard } from './playing-card.model';

// export enum MyCardActions {
//   none = 'none',
//   disabled = 'disabled',
//   attack = 'attack',
//   assist = 'assist',
//   defend = 'defend',
//   transfer = 'transfer',
//   transfer_defend = 'transfer_defend',
// }
// interface Overlay {
//   color: ('grey' | 'red' | 'yellow' | 'green' | 'blue')[];
//   position: 'top' | 'bottom' | 'none';
//   text: string[];
//   actions?: MyCardActions[];
// }
// const ACTION_OVERLAYS: Record<MyCardActions, Overlay | null> = {
//   [MyCardActions.none]: null,
//   [MyCardActions.disabled]: {
//     color: ['grey'],
//     position: 'none',
//     text: ['No actions available with this card'],
//   },
//   [MyCardActions.attack]: {
//     color: ['red'],
//     position: 'top',
//     text: ['Attack'],
//     actions: [MyCardActions.attack],
//   },
//   [MyCardActions.assist]: {
//     color: ['yellow'],
//     position: 'top',
//     text: ['Assist'],
//     actions: [MyCardActions.assist],
//   },
//   [MyCardActions.defend]: {
//     color: ['blue'],
//     position: 'top',
//     text: ['Defend'],
//     actions: [MyCardActions.defend],
//   },
//   [MyCardActions.transfer]: {
//     color: ['green'],
//     position: 'top',
//     text: ['Transfer'],
//     actions: [MyCardActions.transfer],
//   },
//   [MyCardActions.transfer_defend]: {
//     color: ['blue', 'green'],
//     position: 'none',
//     text: ['Defend', 'Transfer'],
//     actions: [MyCardActions.defend, MyCardActions.transfer],
//   },
// };

@Component({
  selector: 'dcg-playing-card',
  templateUrl: './playing-card.component.html',
})
export class PlayingCardComponent {
  // public readonly ACTION_OVERLAYS = ACTION_OVERLAYS;
  // public readonly MyCardActions = MyCardActions;

  // public readonly OVERLAY_DETAILS = OVERLAY_DETAILS;

  public overlays: CardOverlay[] = [];

  @Input()
  public card: PlayingCard = new PlayingCard({});

  private _actions: ActionCard[] = [];
  @Input()
  public set actions(actions: ActionCard[]) {
    this._actions = actions;
    if (this.actions.length > 2) {
      throw new Error(
        `There are more than 2 actions for this card:
        ${JSON.stringify(this.card)}
        ${JSON.stringify(this.actions)}`
      );
    }

    this.overlays = this.actions.map((a) => {
      const overlay = { ...OVERLAY_DETAILS[a.type] };
      if (this.actions.length === 1) {
        overlay.overlayPosition = 'full';
        overlay.textPosition = 'center';
      }
      return { ...overlay, action: a };
    });

    // const actionType = actions[0].type;
    // const deets = ACTION_DETAILS[actionType]

    // TODO: Remove duplicated enum + logic
    // this.action = MyCardActions.none;
    // if (this.actions.length === 2) {
    //   this.action = MyCardActions.transfer_defend;
    // }
    // if (this.actions.length === 1) {
    //   switch (this.actions[0].type) {
    //     case ECardActions.ATTACK:
    //       this.action = MyCardActions.attack;
    //       break;
    //     case ECardActions.ASSIST:
    //       this.action = MyCardActions.assist;
    //       break;
    //     case ECardActions.DEFEND:
    //       this.action = MyCardActions.defend;
    //       break;
    //     case ECardActions.TRANSFER:
    //       this.action = MyCardActions.transfer;
    //       break;

    //     default:
    //       this.action = MyCardActions.none;
    //       break;
    //   }
    // }
  }
  public get actions(): ActionCard[] {
    return this._actions;
  }

  // public action: MyCardActions = MyCardActions.none;

  @Output()
  public actionChange = new EventEmitter<ActionCard>();

  // constructor() {}

  // ngOnInit() {}

  public onAction2(a: ActionCard): void {
    this.actionChange.emit(a);
  }

  // public onAction(action: MyCardActions | null): void {
  //   if (action) {
  //     let cardAction: ECardActions = ECardActions.ATTACK;
  //     switch (action) {
  //       case MyCardActions.attack:
  //         cardAction = ECardActions.ATTACK;
  //         break;
  //       case MyCardActions.assist:
  //         cardAction = ECardActions.ASSIST;
  //         break;
  //       case MyCardActions.defend:
  //         cardAction = ECardActions.DEFEND;
  //         break;
  //       case MyCardActions.transfer:
  //         cardAction = ECardActions.TRANSFER;
  //         break;

  //       default:
  //         break;
  //     }
  //     this.actionChange.emit(this.actions.find((a) => a.type === cardAction));
  //   }
  // }
}
