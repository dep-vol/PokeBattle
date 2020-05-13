import { Char } from '../../../api/types';
import { inferValues } from '../../../init/types/store';

export const asyncInitGameActions = {
    INIT_GAME_ACTION: 'BATTLE/INIT_GAME/INIT_GAME' as const
};

export const initGameActions = {
    loadPlayer: (char: Char) => ({type: 'BATTLE/INIT_GAME/LOAD_PLAYER', char} as const),
    loadEnemy: (char: Char) => ({type: 'BATTLE/INIT_GAME/LOAD_ENEMY', char} as const),
    initialLoad: () => ({type: 'BATTLE/INIT_GAME/LOADING'} as const),

    //ASYNC ACTIONS
    initGame: (playerCharName: string) => ({type: asyncInitGameActions.INIT_GAME_ACTION, playerCharName} as const)
};

export type InitGameActions = ReturnType<inferValues<typeof initGameActions>>;