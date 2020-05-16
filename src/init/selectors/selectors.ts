import { RootState } from 'init/store';
import { Char } from 'init/types/store';


export const getOffsetAndLimit = (state: RootState) => {
    return {offset: state.charsState.offset, requestLimit: state.charsState.requestLimit};
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
