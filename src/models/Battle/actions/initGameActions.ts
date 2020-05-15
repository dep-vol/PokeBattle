import { Char } from 'init/types/store';
import { History } from 'history';

export const asyncInitGameActions = {
    INIT_GAME_ACTION: 'BATTLE/INIT_GAME/INIT_GAME' as const
};

export const initGameActions = {
    loadPlayer: (char: Char) => ({type: 'BATTLE/INIT_GAME/LOAD_PLAYER', char} as const),
    loadEnemy: (char: Char) => ({type: 'BATTLE/INIT_GAME/LOAD_ENEMY', char} as const),
    initialStart: () => ({type: 'BATTLE/INIT_GAME/START'} as const),

    //ASYNC ACTIONS
    initGame: (playerCharName: string, history: History) => ({type: asyncInitGameActions.INIT_GAME_ACTION, playerCharName, history} as const)
};

