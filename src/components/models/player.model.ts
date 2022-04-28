import { Avatars } from '../player-avatar/player-avatar.model';
import { PlayingCard } from '../playing-card/playing-card.model';

export enum PlayerType {
  MANUAL,
  AI,
  ML,
  ONLINE,
}

export interface Player {
  id: number;
  type: PlayerType;
  label: string;
  cards: PlayingCard[];
  lowestStartingCard?: PlayingCard;
  avatar?: Avatars;
}
