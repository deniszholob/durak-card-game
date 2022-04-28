import { PlayingCard } from '../playing-card/playing-card.model';

export enum EBattleActions {
  WAIT = 4,
  TAKE = 5,
  END = 6,
}

export enum ECardActions {
  ATTACK = 0,
  DEFEND = 1,
  ASSIST = 2,
  TRANSFER = 3,
}

export type TurnActions = ECardActions | EBattleActions;

export const ACTION_NAMES: Record<TurnActions, string> = {
  [EBattleActions.WAIT]: 'Wait',
  [ECardActions.ATTACK]: 'Attack',
  [ECardActions.DEFEND]: 'Defend',
  [ECardActions.ASSIST]: 'Assist',
  [ECardActions.TRANSFER]: 'Transfer',
  [EBattleActions.TAKE]: 'Take',
  [EBattleActions.END]: 'Done',
};

export interface RoundAction {
  type: TurnActions;
  card: PlayingCard | null;
  target: PlayingCard | null;
}

export interface ActionBattle extends RoundAction {
  type: EBattleActions;
  card: null;
  target: null;
}

export interface ActionCard extends RoundAction {
  type: ECardActions;
  card: PlayingCard;
}

export interface ActionCardDefend extends ActionCard {
  target: PlayingCard;
}
export interface ActionCardAttack extends ActionCard {
  target: null;
}
export interface ActionCardAssist extends ActionCard {
  target: null;
}
export interface ActionCardTransfer extends ActionCard {
  target: null;
}
