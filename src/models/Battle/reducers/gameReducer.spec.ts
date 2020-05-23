import { gameReducer } from './gameReducer';
import { gameActions as actions } from '../actions/gameActions';
import { Char, PlayerState } from 'init/types/store';
import { createMemoryHistory } from 'history';

const initialState: PlayerState = {
    Player: {
        name: '',
        stats: [],
        sprites: '',
        baseHP: 0,
        countHP: 100,
        weight: 0,
        baseMP: 0,
        countMP: 100
    },
    Enemy: {
        name: '',
        stats: [],
        sprites: '',
        baseHP: 0,
        countHP: 100,
        weight: 0,
        baseMP: 0,
        countMP: 100
    },
    gameStart: false,
    log: {
        value: '',
        action: ''
    },
    playerWaiting: false,
    resultLog: [],
    isLooser: false,
    isPlayerWinner: false

};

describe('Game Reducer', () => {
    describe('LOAD_PLAYER', () => {
        let newState: PlayerState;

        it('should handle BATTLE/INIT_GAME/LOAD_PLAYER action', () => {

            const Player: Char = {
                name: 'Bulbasaur',
                sprites: 'http://google.com',
                weight: 500,
                baseMP: 100,
                countHP: 100,
                countMP: 100,
                baseHP: 100,
                stats: [{name: 'hp', base: 100}, {name: 'mp', base: 100}]
            };

            newState = gameReducer(initialState, actions.loadPlayer(Player));

            expect(newState).toEqual({
                ...initialState, Player: Player
            });
        });

        it('should set countMP and countHP to 100', () => {
            expect(newState.Player.countHP).toEqual(100);
            expect(newState.Player.countMP).toEqual(100);
        });
    });

    describe('LOAD_ENEMY', () => {

        const enemy: Char = {
            name: 'Pikachu',
            sprites: 'http://google.com',
            weight: 200,
            baseMP: 300,
            countHP: 100,
            countMP: 100,
            baseHP: 140,
            stats: [{name: 'hp', base: 100}, {name: 'mp', base: 300}]
        };

        const newState = gameReducer(initialState, actions.loadEnemy(enemy));

        it('should handle BATTLE/INIT_GAME/LOAD_ENEMY action', () => {
            expect(newState).toEqual({
                ...initialState, Enemy: enemy
            });
        });

        it('should set countMP and countHP to 100', () => {
            expect(newState.Enemy.countHP).toEqual(100);
            expect(newState.Enemy.countMP).toEqual(100);
        });
    });

    describe('GAME_START', () => {

        const newState = gameReducer(initialState, actions.initialStart());

        it('should handle BATTLE/INIT_GAME/START action', () => {
            expect(newState).toEqual({
                ...newState, gameStart: true
            });
        });
    });

    describe('Saga async actions with side effects not changed state by itself', () => {

        const history = createMemoryHistory();

        it('should return state by handling BATTLE/INIT_GAME/INIT_GAME action', () => {
            expect(gameReducer(initialState, actions.initGame('Bulbasaur', history))).toEqual(initialState);
        });

        it('should return state by handling BATTLE/ENGINE/PLAYER_ATTACK action', () => {
            expect(gameReducer(initialState, actions.playerAttack(true, true))).toEqual(initialState);
        });

        it('should return state by handling BATTLE/ENGINE/HEAL_ACTION', () => {
            expect(gameReducer(initialState, actions.healActivate(true))).toEqual(initialState);
        });
    });

    describe('GAME START', () => {
        let prevState: PlayerState = {
            ...initialState,
            Player: {
                name: 'Bulbasaur',
                sprites: 'http://google.com',
                weight: 500,
                baseMP: 100,
                countHP: 100,
                countMP: 100,
                baseHP: 100,
                stats: [{name: 'hp', base: 100}, {name: 'mp', base: 100}]
            },
            Enemy: {
                name: 'Pikachu',
                sprites: 'http://google.com',
                weight: 200,
                baseMP: 300,
                countHP: 100,
                countMP: 100,
                baseHP: 140,
                stats: [{name: 'hp', base: 100}, {name: 'mp', base: 300}]
            },
            gameStart: true

        };

        it('should handle BATTLE/ENGINE/MAKE_ATTACK action', () => {
            const newState = gameReducer(prevState, actions.makeAttack(50, true));
            expect(newState).toEqual({
                ...prevState, Player: {
                    ...prevState.Player, stats: prevState.Player.stats.map((stat) => {
                        if (stat.name === 'hp') {
                            return {...stat, base: 50};
                        }
                        return stat;
                    }),
                    countHP: 50 / prevState.Player.baseHP
                }
            });

            prevState = newState;

        });

        it('should handle BATTLE/ENGINE/SET_LOG_ACTION action', () => {
            const newState = gameReducer(prevState, actions.setLogAction('Attack'));

            expect(newState).toEqual({...prevState, log: {...prevState.log, value: prevState.log.value + 'Attack' }})
        });

        it('should handle BATTLE/ENGINE/CLEAR_LOG_ACTION', () => {
            const newState = gameReducer(prevState, actions.clearLog());

            expect (newState).toEqual({...prevState, log: {...prevState.log, value: ''}});
        });

        it('should handle BATTLE/ENGINE/IS_WAITING action', () => {
            const newState = gameReducer(prevState, actions.isWaiting())

            expect(newState).toEqual({...prevState, playerWaiting: !prevState.playerWaiting});
        });

        it('should handle BATTLE/ENGINE/HEALING action', () => {
            const newState = gameReducer(prevState, actions.healing(30, false));

            expect(newState).toEqual({
                ...prevState, Player: {
                    ...prevState.Player, stats: prevState.Player.stats.map((stat) => {
                        if(stat.name === 'hp') {
                            return {...stat, base: 30};
                        }
                        return stat;
                    }),
                    countHP: 30 / prevState.Player.baseHP
                }
            });
        });

        it('should handle BATTLE/ENGINE/REDUCE_MP action', () => {
            const newState = gameReducer(prevState, actions.reduceMP(50, true));

            expect(newState).toEqual({
                ...prevState, Enemy: {...prevState.Enemy, stats: prevState.Enemy.stats.map((stat) => {
                    if(stat.name === 'mp') {
                        return {...stat, base: 50};
                    }
                    return stat;
                }),
                countMP: 50 / prevState.Enemy.baseMP
                }
            });
        });

        it('should handle BATTLE/ENGINE/PUSH_RESULT action', () => {
            const newState = gameReducer(prevState, actions.pushResultOfTheBattle());

            expect(newState).toEqual({
                ...prevState, resultLog: [...prevState.resultLog, {enemy: prevState.Enemy.name, log: prevState.log.value}]
            });
        });

        it('should handle BATTLE/ENGINE/IS_LOOSER action', () => {
            const newState = gameReducer(prevState, actions.setIsLooser());

            expect(newState).toEqual({
                ...prevState, isLooser: true
            });
        });

        it('should handle BATTLE/ENGINE/IS_WINNER action', () => {
            const newState = gameReducer(prevState, actions.playerIsWinner());

            expect(newState).toEqual({
                ...prevState, isPlayerWinner: true
            });
        });


    });

});