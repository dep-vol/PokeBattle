import { RootState } from 'init/store';
import { Char } from 'init/types/store';


export const getLoadingState = (state: RootState) => state.charsState.isLoading;
export const getGameStartState = (state: RootState) => state.initGame.gameStart;
export const getChars = (state: RootState) => state.charsState.chars;
export const getOffset = (state: RootState) => state.charsState.offset;
export const getRequestLimit = (state: RootState) => state.charsState.requestLimit;

export const getOffsetAndLimit = (state: RootState) => {
    return {offset: getOffset(state), requestLimit: getRequestLimit(state)};
};
export type OffsetAndLimit = ReturnType<typeof getOffsetAndLimit>;

export const getPlayers = (state: RootState, name: string): {player?: Char; enemy?: Char} => {
    const chars = state.charsState.chars;
    const player = chars.find((char) => char.name === name);
    const enemy = chars.find((char) => char.name !== name && char.played !== true );
    return {player, enemy};
};
export type PlayersSelectType = ReturnType<typeof getPlayers>;

export const getPlayerData = (state: RootState) => state.initGame.Player;
export type PlayerDataType = ReturnType<typeof getPlayerData>;

export const getEnemyData = (state: RootState) => state.initGame.Enemy;
export type EnemyDataType = ReturnType<typeof getEnemyData>;

export const getEnemyCountHP = (state: RootState) => state.initGame.Enemy.countHP;
export const getPlayerCountHP = (state: RootState) => state.initGame.Player.countHP;


export const getLoggerValue = (state: RootState) => state.initGame.log.value;
export const getWaitingValue = (state: RootState) => state.initGame.playerWaiting;

export const getResultLog = (state: RootState) => state.initGame.resultLog;

export const getIsPlayerWinner = (state: RootState) => state.initGame.isPlayerWinner;
export const getIsLooser = (state: RootState) => state.initGame.isLooser;
