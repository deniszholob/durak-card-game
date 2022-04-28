import { PlayingCard } from '../playing-card/playing-card.model';

export interface Bout {
  attackCard?: PlayingCard;
  defenseCard?: PlayingCard;
}
