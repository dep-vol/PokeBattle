import { PlayerState } from '../../../init/types/store';
import { InitGameActions } from '../actions/initGameActions';

const initialState: PlayerState = {
    Player: {
        name: '',
        stats:[],
        sprites:'',
        weight: 0,
        played: true
    },
    Enemy: {
        name: '',
        stats:[],
        sprites:'',
        weight: 0,
        played: false
    },
    loading: false

};

export const initGameReducer =(state = initialState, action: InitGameActions): PlayerState => {
    switch (action.type) {
        case 'BATTLE/INIT_GAME/LOAD_PLAYER':{
            return {...state, Player:{...action.char}};
        }
        case 'BATTLE/INIT_GAME/LOAD_ENEMY':{
            return {...state, Enemy:{...action.char, played: true}};
        }
        case 'BATTLE/INIT_GAME/LOADING': {
            return {...state, loading: true};
        }
        case 'BATTLE/INIT_GAME/INIT_GAME': {
            return state;
        }
        default:
            // eslint-disable-next-line
            const x: never = action;
            return state;
    }
};