import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Subject, tap } from 'rxjs';
// Component models
import { Bout } from 'src/components/bout/bout.model';
import { CardDeck } from 'src/components/card-deck/card-deck.model';
import {
  ActionCardAttack,
  ActionCardDefend,
  ActionCardTransfer,
  EBattleActions,
  ECardActions,
  RoundAction,
  TurnActions,
} from 'src/components/models/game-action.model';
import { Player, PlayerType } from 'src/components/models/player.model';
import { Avatars } from 'src/components/player-avatar/player-avatar.model';
import {
  CardComparator,
  PlayingCard,
} from 'src/components/playing-card/playing-card.model';
// Utils
import { randomEnum } from 'src/utils/array-functions/array-functions';

// Relative
import { MAX_HAND_SIZE, STANDARD_DECK_SIZE } from './config.const';
import { GameState } from './game-state.model';

// const DEFAULT_PLAYERS: PlayerType[] = [PlayerType.MANUAL, PlayerType.MANUAL];
const DEFAULT_PLAYERS: PlayerType[] = [PlayerType.MANUAL, PlayerType.AI];
// const DEFAULT_PLAYERS: PlayerType[] = [PlayerType.AI, PlayerType.AI];
enum GameStatus {
  INIT,
  PLAYING,
  ENDED,
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  // private gameReplay: GameState[] = [];
  private gameState: GameState = this.resetGameState();

  private gameStatus: GameStatus = GameStatus.INIT;
  private playerCount: number = 0;

  public manualActions: RoundAction[] = [];

  // private g_playerOrder: PlayerOrder[] = [];

  // TODO: Read from settings/switch on the fly
  private playerHandSort: CardComparator = PlayingCard.getCompareSort(
    'rank',
    'asc'
  );

  public get isGame(): boolean {
    return this.gameStatus === GameStatus.PLAYING;
  }

  public get isGameOver(): boolean {
    return this.gameStatus === GameStatus.ENDED;
  }

  public get players(): Player[] {
    return this.gameState.players;
  }

  public get currentAttacker(): number {
    return this.gameState.attackerIdx;
  }
  public get currentDefender(): number {
    return this.gameState.defenderIdx;
  }

  public get deck(): CardDeck {
    return this.gameState.deck;
  }

  public get battleRound(): Bout[] {
    return this.gameState.battle;
  }

  // private getBattleCards(includeDefense: boolean = false): PlayingCard[] {
  //   return this.gameState.battle.flatMap((b: Bout): PlayingCard[] => {
  //     const cards: PlayingCard[] = [];
  //     if (b.attackCard) cards.push(b.attackCard);
  //     if (b.defenseCard && includeDefense) cards.push(b.defenseCard);
  //     return cards;
  //   });
  // }

  private getAllBattleCards(): PlayingCard[] {
    return this.gameState.battle.flatMap((b: Bout): PlayingCard[] => {
      const cards: PlayingCard[] = [];
      if (b.attackCard) cards.push(b.attackCard);
      if (b.defenseCard) cards.push(b.defenseCard);
      return cards;
    });
  }

  private getUnBeatBattleCards(): PlayingCard[] {
    return this.gameState.battle
      .filter((b: Bout): boolean => !!b.attackCard && !b.defenseCard)
      .map((b: Bout): PlayingCard => b.attackCard as PlayingCard);
  }

  public getCurrentPlayer(): Player {
    return this.gameState.players[this.gameState.currentPlayerIndex];
  }

  public getCurrentManualPlayer(): Player | undefined {
    const currentPlayer = this.getCurrentPlayer();
    if (currentPlayer.type === PlayerType.MANUAL) {
      return currentPlayer;
    }
    const player: Player | undefined = this.gameState.players.find(
      (p: Player): boolean => p.type === PlayerType.MANUAL
    );
    // if (!player) throw new Error(`No Manual Players Exist!`);
    return player;
  }

  // ======================================================================= //
  // ======================================================================= //
  // ======================================================================= //

  public newGame(
    playerTypes: PlayerType[] = [],
    targetDeckSize: number = STANDARD_DECK_SIZE
    // targetDeckSize: number = MIN_DECK_SIZE
  ): void {
    console.log('=== New Game Starting...', targetDeckSize);
    this.gameStatus = GameStatus.INIT;
    this.resetGameState(targetDeckSize);
    console.log(`deck`, this.gameState.deck.cards);
    playerTypes = this.checkPlayerCount(playerTypes);
    // console.log(`players: ${this.playerCount}`);
    this.setUpPlayers(playerTypes);
    // console.log(`players`, this.players);
    this.dealCards();
    this.sortPlayersByOrder();
    // this.determinePlayerOrder();
    // console.log(`g_players`, this.gameState.players);
    // console.log(`deck`, this.gameState.deck.cards);
    this.gameStatus = GameStatus.PLAYING;
    console.log(`this.gameState`, this.gameState);
    // console.log('Done.');
  }

  public beginGame(): void {
    console.log(`beginGame`);
    this.executeNextTurn();
  }

  /** Public b/c can forcefully end game from UI
   * TODO: When is this called in the logic?
   * */
  public endGame(): void {
    console.log(`endGame`);
    this.gameStatus = GameStatus.ENDED;
  }

  private resetGameState(deckSize?: number): GameState {
    this.gameState = {
      currentPlayerIndex: 0,
      attackerIdx: 0,
      defenderIdx: 1,
      battle: [],
      deck: new CardDeck(deckSize),
      discardHeap: [],
      players: [],
    };
    return this.gameState;
  }

  private checkPlayerCount(playerTypes: PlayerType[]): PlayerType[] {
    const deckSize = this.gameState.deck.cards.length;
    const maxPlayers = Math.floor(deckSize / MAX_HAND_SIZE);
    const minPlayers = 2;
    if (playerTypes.length < minPlayers) {
      playerTypes = DEFAULT_PLAYERS;
    }
    this.playerCount =
      playerTypes.length > maxPlayers ? maxPlayers : playerTypes.length;
    return playerTypes;
  }

  private setUpPlayers(playerTypes: PlayerType[]): void {
    const avatarsSelection = Object.values(Avatars).filter(
      (a) => typeof a !== 'string' // Ignore the indexes associated with each key
    );

    // console.log(playerTypes);
    this.gameState.players = playerTypes.map(
      (type: PlayerType, i: number): Player => {
        // const randomNumber: number = Math.floor(
        //   Math.random() *
        //     (avatarsSelection.length > 0
        //       ? avatarsSelection.length
        //       : Object.values(Avatars).length / 2 - 1)
        // );
        // const avatar =
        //   avatarsSelection.length > 0
        //     ? (avatarsSelection.splice(randomNumber, 1)[0] as Avatars)
        //     : randomNumber;
        const RANDOM_AVATAR = randomEnum(Avatars);

        return {
          id: i,
          type,
          cards: [],
          label: type === PlayerType.MANUAL ? `Player ${i + 1}` : RANDOM_AVATAR,
          avatar: type === PlayerType.MANUAL ? undefined : RANDOM_AVATAR,
          // label: type === PlayerType.MANUAL ? 'Player' : Avatars[avatar],
          // avatar: type === PlayerType.MANUAL ? undefined : Avatars[avatar],
        };
      }
    );
  }

  private dealCards(): void {
    this.gameState.players.map((p) => {
      this.addCardsToPlayer(p, this.gameState.deck.dealCards(MAX_HAND_SIZE));
      // p.cards = this.gameState.deck.dealCards(MAX_HAND_SIZE);
      // p.cards.sort((a, b) => PlayingCard.getCompareSort()(b, a));
    });
  }

  // /** @deprecated Use sortPlayersByOrder() */
  // private determinePlayerOrder(): void {
  //   this.g_playerOrder = this.gameState.players
  //     // Convert hands to lowest cards and save original index
  //     .map(
  //       (p: Player): PlayerOrder => ({
  //         i: p.id,
  //         card: this.findLowestCards(p.cards),
  //       })
  //     )
  //     // Can sort based on card and then by index if suit mismatch
  //     .sort(
  //       (a: PlayerOrder, b: PlayerOrder): number =>
  //         PlayingCard.getCompare((): number => b.i - a.i)(a.card, b.card) * -1
  //     );
  //   this.gameState.attackerIdx = 0;
  // }

  private sortPlayersByOrder(): void {
    console.log('=== sortPlayersByOrder');
    this.gameState.players = this.gameState.players
      .map((p) => {
        p.lowestStartingCard = this.findLowestCards(p.cards);
        return p;
      })
      // Can sort based on card and then by index if suit mismatch
      .sort((a: Player, b: Player) => {
        if (!a.lowestStartingCard && !b.lowestStartingCard) return 0;
        if (!a.lowestStartingCard) return 1;
        if (!b.lowestStartingCard) return -1;
        return (
          PlayingCard.getCompare((): number => b.id - a.id)(
            a.lowestStartingCard,
            b.lowestStartingCard
          ) * -1
        );
      })
      .map((p, idx) => {
        p.id = idx;
        return p;
      });
    console.log(`this.gameState.players`, this.gameState.players);
  }

  private executeNextTurn(): void {
    console.log(`=== executeNextTurn`);
    // const currentAttackerPlayer = this.getPlayerFromOrder(this.currentAttacker);
    const currentAttackerPlayer: Player =
      this.gameState.players[this.gameState.attackerIdx];
    this.startNextBoutAction(currentAttackerPlayer);
  }

  /** Assumes array is sorted
   * @returns lowestTrumpCard or lowestCard if no trumps
   */
  private findLowestCards(cards: PlayingCard[]): PlayingCard {
    const lowestTrumpCard: PlayingCard | undefined = cards.find(
      (c: PlayingCard): boolean => c.isTrump
    );
    return lowestTrumpCard ?? cards[0];
  }

  // ======================================================================= //
  // ======================================================================= //
  // ======================================================================= //

  private isPlayerAttacker(player: Player): boolean {
    return player.id === this.currentAttacker;
  }
  private isPlayerDefender(player: Player): boolean {
    return player.id === this.currentDefender;
  }
  private isPlayerAssistant(player: Player): boolean {
    return (
      player.id !== this.currentAttacker && player.id !== this.currentDefender
    );
  }

  private cardsToActionMap(
    actionType: TurnActions,
    card: PlayingCard,
    target: PlayingCard | null
  ) {
    return (c: PlayingCard) => ({
      type: ECardActions.ATTACK,
      card: c,
      target: null,
    });
  }

  // Game Flow
  // 1 action per player including skipping action

  private startNextBoutAction(player: Player): void {
    console.log(`=== startNextBoutAction`, player);
    if (this.isEndGame()) this.endGame();

    // TODO: AI wait a random time b/w 1 and n seconds?
    const actionSpace: RoundAction[] = this.getAvailableActions(player);
    console.log(`actionSpace`, actionSpace);

    if (player.type === PlayerType.AI) {
      this.manualActions = [];
      const bestAction: RoundAction = this.aiGetBestAction(actionSpace);
      this.executeAction(player, bestAction);
    } else {
      this.manualActions = actionSpace;
    }
  }

  // TODO: Add some logic around trump cards
  private aiGetBestAction(actions: RoundAction[]): RoundAction {
    if (actions[0].type === EBattleActions.END && actions.length > 1) {
      return actions[1];
    }
    return actions[0];
  }

  private getAvailableActions(player: Player): RoundAction[] {
    console.log(`=== getAvailableActions`, player);
    if (this.isPlayerAttacker(player)) {
      return this.getAvailableActionsForAttacker(player);
    }
    if (this.isPlayerDefender(player)) {
      return this.getAvailableActionsForDefender(player);
    }
    return this.getAvailableActionsForAssistant(player);
  }

  private getAvailableActionsForAttacker(player: Player): RoundAction[] {
    console.log(`=== getAvailableActionsForAttacker`, player);
    const numBouts: number = this.gameState.battle.length;
    const battleCards: PlayingCard[] = this.getAllBattleCards();
    let availableCards: PlayingCard[] = player.cards;
    let actions: RoundAction[] = [];

    // Any card goes at first, but only matching face values after + end action
    if (numBouts > 0) {
      availableCards = PlayingCard.findMatchingFaceCards(
        availableCards,
        battleCards
      );
      actions.push({ type: EBattleActions.END, card: null, target: null });
    }

    actions.push(
      ...availableCards.map<RoundAction>(
        (c: PlayingCard): ActionCardAttack => ({
          type: ECardActions.ATTACK,
          card: c,
          target: null,
        })
      )
    );

    return actions;
  }

  private getAvailableActionsForDefender(player: Player): RoundAction[] {
    console.log(`=== getAvailableActionsForDefender`, player);
    const numBouts: number = this.gameState.battle.length;
    const battleCards: PlayingCard[] = this.getUnBeatBattleCards();
    let availableCards: PlayingCard[] = player.cards;
    let actions: RoundAction[] = [];

    if (numBouts >= MAX_HAND_SIZE || player.cards.length <= 0) {
      throw new Error(`Max bouts reached.`);
    }
    // for each attacking card, find all the cards that can be used for defense
    // then Set the array to only hold unique cards
    // if defending cards are less than available attacking cards, can only take
    // battleCards.map((attackCard) =>
    //   PlayingCard.compareBout(attackCard, defendCard)
    // );

    const availableDefenseCards: PlayingCard[] =
      PlayingCard.findCardsThatBeatOthers(availableCards, battleCards);

    // TODO: Need to refine logic to handle "No Attack card to execute defense with error"?
    actions.push(
      ...availableDefenseCards.flatMap<RoundAction>(
        (defenseCard: PlayingCard): RoundAction[] =>
          PlayingCard.findPossibleAttackTargets(defenseCard, battleCards).map(
            (attackCard: PlayingCard): ActionCardDefend => ({
              type: ECardActions.DEFEND,
              card: defenseCard,
              target: attackCard,
            })
          )
      )
    );

    // TODO: Transfers Actions: cannot do until game supports multiple actions per turn
    // If transfer happens next player will have to beat 2 cars but can only perform 1 action.
    if (numBouts === 1) {
      // const transferCards: PlayingCard[] = PlayingCard.findMatchingFaceCards(
      //   availableCards,
      //   battleCards
      // );
      // actions.push(
      //   ...transferCards.map(
      //     (transferCard: PlayingCard): ActionCardTransfer => ({
      //       type: ECardActions.TRANSFER,
      //       card: transferCard,
      //       target: null,
      //     })
      //   )
      // );
    }

    // Can always Take
    actions.push({ type: EBattleActions.TAKE, card: null, target: null });
    // throw new Error('Method not finished.');
    return actions;
  }

  private getAvailableActionsForAssistant(player: Player): RoundAction[] {
    console.log(`=== getAvailableActionsForAssistant`, player);
    throw new Error('Method not implemented.');
  }

  public executeAction(player: Player, action: RoundAction): void {
    console.log(`=== executeAction`, player, action);
    switch (action.type) {
      case ECardActions.ASSIST:
        this.executeAssist(player, action);
        break;
      case ECardActions.ATTACK:
        this.executeAttack(player, action);
        break;
      case ECardActions.DEFEND:
        this.executeDefend(player, action);
        break;
      case ECardActions.TRANSFER:
        this.executeTransfer(player, action);
        break;
      case EBattleActions.TAKE:
        this.executeTake(player);
        break;
      case EBattleActions.END:
        this.executeEnd();
        break;
      case EBattleActions.WAIT:
        this.executeWait(player);
        break;
      default:
        this.executeWait(player);
        break;
    }
  }

  /** Game ends when all cards have been taken from deck and 1 player remains with cards in hand */
  private isEndGame(): boolean {
    if (this.gameState.deck.cards.length > 0) return false;

    const playersWithCards = this.gameState.players.filter(
      (p) => p.cards.length !== 0
    );
    console.log(`endGame`, playersWithCards);
    return playersWithCards.length <= 1;
  }

  /** Players drop from the game if deck is empty and player doesn't have any more cards */
  private isPlayerVictorious(player: Player): boolean {
    return this.gameState.deck.cards.length === 0 && player.cards.length === 0;
  }

  private endBoutAction(player: Player): void {
    console.log(`=== endBoutAction`, player);

    if (this.isEndGame()) {
      return this.endGame();
    }

    if (
      player.id === this.gameState.attackerIdx &&
      this.gameState.battle.length === 1
    ) {
      this.gameState.currentPlayerIndex = this.gameState.defenderIdx;
    } else {
      this.gameState.currentPlayerIndex =
        (this.gameState.currentPlayerIndex + 1) % this.playerCount;
    }

    this.startNextBoutAction(this.getCurrentPlayer());
  }

  private executeAssist(player: Player, action: RoundAction): void {
    console.log(`=== executeAssist`, player, action);
    this.endBoutAction(player);
    throw new Error('Method not implemented.');
  }

  private executeAttack(player: Player, action: RoundAction): void {
    console.log(`=== executeAttack`, player, action);
    if (this.gameState.battle.length >= MAX_HAND_SIZE) {
      throw new Error(
        `Cannot attack anymore as there are already max of ${MAX_HAND_SIZE} bouts!`
      );
    }
    if (!action.card) {
      throw new Error('No Attack card to execute Attack with!');
    }

    this.gameState.battle.push({ attackCard: action.card });
    this.removeCardFromPlayer(player, action.card);
    // if (player.cards.length <= 0) {
    //   this.executeEnd();
    // } else {
    this.endBoutAction(player);
    // }
  }

  private executeDefend(player: Player, action: RoundAction): void {
    console.log(`=== executeDefend`, player, action);
    if (!action.card) {
      throw new Error('No Attack card to execute Defense with!');
    }
    if (!action.target) {
      throw new Error('No Target card to execute Defense with!');
    }

    const boutIdx: number = this.gameState.battle.findIndex(
      (b: Bout): boolean => b.attackCard === action.target
    );

    if (boutIdx < 0) {
      throw new Error(
        `No Bout card found matching Target ${action.target} to execute Defense with!`
      );
    }

    this.gameState.battle[boutIdx].defenseCard = action.card;
    this.removeCardFromPlayer(player, action.card);
    if (player.cards.length <= 0) {
      this.executeEnd();
    } else {
      this.endBoutAction(player);
    }
  }

  /** Advance roles (switch from defender to attacker) */
  private executeTransfer(player: Player, action: RoundAction): void {
    console.log(`=== executeTransfer`, player, action);
    this.nextAttackPlayer();
    this.executeAttack(player, action);
  }

  private executeWait(player: Player): void {
    console.log(`=== executeWait`);
    this.endBoutAction(player);
    // End action (not the battle)
    throw new Error('Method not implemented.');
  }

  private executeTake(player: Player): void {
    // TODO: Add a way for other players to throw in cards b4 taking

    setTimeout(() => {
      console.log(`=== executeTake`);
      // TODO:Animations
      this.cleanBattle(player);
      this.replenishFromDeck();
      this.setNextBattle(true);
    }, 0);
    // throw new Error('Method not implemented.');
  }

  private executeEnd(): void {
    setTimeout(() => {
      console.log(`=== executeEnd`);
      // TODO:Animations
      this.cleanBattle();
      this.replenishFromDeck();
      this.setNextBattle();
    }, 0);

    // throw new Error('Method not implemented.');
  }

  // ======================================================================= //
  // ======================================================================= //
  // ======================================================================= //

  private removeCardFromPlayer(player: Player, card: PlayingCard): void {
    player.cards = player.cards.filter(
      (c: PlayingCard): boolean => c.stringify() !== card.stringify()
    );
  }

  private cleanBattle(player?: Player) {
    console.log(`=== cleanBattle`, player);
    const battleCards: PlayingCard[] = this.getAllBattleCards();
    if (player) {
      this.addCardsToPlayer(player, battleCards);
    } else {
      this.gameState.discardHeap.push(...battleCards);
    }
    this.gameState.battle = [];
  }

  private setNextBattle(skipNextPlayer: boolean = false): void {
    console.log(`=== setNextBattle`, skipNextPlayer);
    this.nextAttackPlayer(skipNextPlayer ? 2 : 1);
    this.executeNextTurn();
  }

  /** Advances the next player to be the attacker:
   * p1:Attacker, p2:Defender, p3:Assister =>
   * p1:Assister, p2:Attacker, p3:Defender
   */
  private nextAttackPlayer(nextPlayer: 2 | 1 = 1): void {
    this.gameState.attackerIdx =
      (this.gameState.attackerIdx + nextPlayer) % this.playerCount;
    this.gameState.defenderIdx =
      (this.gameState.attackerIdx + 1) % this.playerCount;
  }

  /*
   * Add more cards to hands less then 6 from the deck
   * TODO: Attacker Replenishes first
   */
  private replenishFromDeck(): void {
    console.log(`=== replenishFromDeck`);
    this.gameState.players.forEach((player: Player): void => {
      if (player.cards.length < MAX_HAND_SIZE) {
        this.addCardsToPlayer(
          player,
          this.gameState.deck.dealCards(MAX_HAND_SIZE - player.cards.length)
        );
      }
    });
  }

  private addCardsToPlayer(player: Player, cards: PlayingCard[]): void {
    console.log(`=== addCardsToPlayer`, player, cards);
    player.cards.push(...cards);
    player.cards.sort(this.playerHandSort);
    // this.gameState.players[player.id].cards.push(...battleCards);
    // console.log(player, this.gameState.players[player.id]);
  }

  private replenishHand(hand: PlayingCard[]): void {
    hand.push(...this.gameState.deck.dealCards(MAX_HAND_SIZE - hand.length));
    hand.sort(this.playerHandSort);

    this.gameState.players.map((p: Player): void => {
      p.cards = this.gameState.deck.dealCards(MAX_HAND_SIZE - hand.length);
      p.cards.sort(this.playerHandSort);
    });
  }

  // ======================================================================= //
  // ======================================================================= //
  // ======================================================================= //

  /** @deprecated */
  public defendWith(card: PlayingCard): void {
    const defendAgainst: Bout | undefined = this.gameState.battle.find(
      (b: Bout): boolean =>
        b.attackCard ? PlayingCard.compareBout(b.attackCard, card) : false
    );
    if (defendAgainst) {
      defendAgainst.defenseCard = card;
    }
  }

  /** @deprecated */
  // private getPlayerFromOrder(i: number) {
  //   return this.players[this.g_playerOrder[i].i];
  // }
}
