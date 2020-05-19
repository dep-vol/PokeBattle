import { PlayerState } from '../../../init/types/store';
import {GameActions} from '../actions/gameActions';

const initialState: PlayerState = {
    Player: {
        name: '',
        stats:[],
        sprites:'',
        baseHP: 0,
        countHP: 100,
        weight: 0,
        baseMP: 0,
        countMP: 100
    },
    Enemy: {
        name: '',
        stats:[],
        sprites:'',
        baseHP: 0,
        countHP: 100,
        weight: 0,
        baseMP: 0,
        countMP: 100
    },
    gameStart: false,
    log: {
        value:'',
        action:''
    },
    playerWaiting: false

};

export const gameReducer =(state = initialState, action: GameActions): PlayerState => {
    switch (action.type) {
        case 'BATTLE/INIT_GAME/LOAD_PLAYER':{
            return {...state, Player:{...state.Player, ...action.char, countHP: 100, countMP: 100}};
        }
        case 'BATTLE/INIT_GAME/LOAD_ENEMY':{
            return {...state, Enemy:{...state.Enemy,...action.char, countHP: 100, countMP: 100}};
        }
        case 'BATTLE/INIT_GAME/START': {
            return {...state, gameStart: true};
        }
        case 'BATTLE/INIT_GAME/INIT_GAME': {
            return state;
        }
        case 'BATTLE/ENGINE/PLAYER_ATTACK': {
            return state;
        }
        case 'BATTLE/ENGINE/MAKE_ATTACK': {
            return action.isEnemy
                ? {
                    ...state, Player: {
                        ...state.Player, stats: state.Player.stats.map((stat) => {
                            return stat.name === 'hp' ? {...stat, base: action.hp} : stat;
                        }), countHP: action.hp / state.Player.baseHP
                    }
                }
                : {
                    ...state, Enemy: {
                        ...state.Enemy, stats: state.Enemy.stats.map((stat) => {
                            return stat.name === 'hp' ? {...stat, base: action.hp} : stat;
                        }), countHP: action.hp / state.Enemy.baseHP
                    }
                };
        }
        case 'BATTLE/ENGINE/SET_LOG_ACTION': {
            return {...state, log: {...state.log, value: state.log.value + action.action}};
        }
        case 'BATTLE/ENGINE/CLEAR_LOG_ACTION':{
            return {...state, log: {...state.log, value: ''}};
        }
        case 'BATTLE/ENGINE/IS_WAITING': {
            return {...state, playerWaiting: !state.playerWaiting};
        }
        case 'BATTLE/ENGINE/HEAL_ACTION':{
            return state;
        }
        case 'BATTLE/ENGINE/HEALING': {
            return action.isEnemy
                ? {
                    ...state, Enemy: {
                        ...state.Enemy, stats: state.Enemy.stats.map((stat) => {
                            return stat.name === 'hp' ? {...stat, base: action.hp} : stat;
                        }), countHP: action.hp / state.Enemy.baseHP
                    }
                }
                : {
                    ...state, Player: {
                        ...state.Player, stats: state.Player.stats.map((stat) => {
                            return stat.name === 'hp' ? {...stat, base: action.hp} : stat;
                        }), countHP: action.hp / state.Player.baseHP
                    }
                };
        }
        case 'BATTLE/ENGINE/REDUCE_MP': {
            return action.isEnemy
                ? {
                    ...state, Enemy: {
                        ...state.Enemy, stats: state.Enemy.stats.map((stat) => {
                            return stat.name === 'mp' ? {...stat, base: action.mp} : stat;
                        }),
                        countMP: action.mp / state.Enemy.baseMP
                    }

                }
                : {
                    ...state, Player: {
                        ...state.Player, stats: state.Player.stats.map((stat) => {
                            return stat.name === 'mp' ? {...stat, base: action.mp} : stat;
                        }),
                        countMP: action.mp / state.Player.baseMP
                    },

                };
        }
        default:
            // eslint-disable-next-line
            const x: never = action;
            return state;
    }
};