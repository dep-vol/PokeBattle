import { RootState } from 'init/store';
import { Char } from '../../api/types';

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