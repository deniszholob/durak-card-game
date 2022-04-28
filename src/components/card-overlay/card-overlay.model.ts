import { ActionCard, ECardActions } from '../models/game-action.model';

export interface Overlay {
  text: 'Attack' | 'Defend' | 'Assist' | 'Transfer';
  color: 'grey' | 'red' | 'yellow' | 'green' | 'blue';
  textPosition: 'top' | 'bottom' | 'center';
  overlayPosition: 'top' | 'bottom' | 'full';
}

export interface CardOverlay extends Overlay {
  action: ActionCard;
}

export const OVERLAY_DETAILS: Record<ECardActions, Overlay> = {
  [ECardActions.ATTACK]: {
    text: 'Attack',
    color: 'red',
    overlayPosition: 'top',
    textPosition: 'top',
  },
  [ECardActions.DEFEND]: {
    text: 'Defend',
    color: 'blue',
    overlayPosition: 'top',
    textPosition: 'top',
  },
  [ECardActions.ASSIST]: {
    text: 'Assist',
    color: 'yellow',
    overlayPosition: 'bottom',
    textPosition: 'bottom',
  },
  [ECardActions.TRANSFER]: {
    text: 'Transfer',
    color: 'green',
    overlayPosition: 'bottom',
    textPosition: 'bottom',
  },
};
