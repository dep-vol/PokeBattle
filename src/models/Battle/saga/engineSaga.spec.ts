import { Char } from '../../../init/types/store';
import { AnyAction } from 'redux';
import { runSaga } from 'redux-saga';
import { engineSagaWorker } from './engineSaga';
import { turn } from './turnSaga';
import { actions } from '../../../init/rootActions';


const attacker: Char = {
    name: 'Pikachu',
    stats: [
        {name: 'hp', base: 100},
        {name: 'mp', base: 40},
        {name: 'defense', base: 100},
        {name: 'attack', base: 50},
        {name: 'speed', base: 50},
        {name: 'special-defense', base: 100},
        {name: 'special-attack', base: 50}
    ],
    baseHP: 100,
    baseMP: 40,
    countHP: 100,
    countMP: 100,
    weight: 100,
    sprites: 'img',
    played: false
};
const defender: Char = {
    name: 'Bulbasaur',
    stats: [
        {name: 'hp', base: 100},
        {name: 'mp', base: 40},
        {name: 'defense', base: 100},
        {name: 'attack', base: 50},
        {name: 'speed', base: 50},
        {name: 'special-defense', base: 100},
        {name: 'special-attack', base: 50}
    ],
    baseHP: 100,
    baseMP: 40,
    countHP: 100,
    countMP: 100,
    weight: 100,
    sprites: 'img',
    played: false
};

jest.mock('./turnSaga', () => {
    return {
        turn: jest.fn()
    };
});

jest.mock('redux-saga/effects', () => {
    const originalModule = jest.requireActual('redux-saga/effects');
    return {
        ...originalModule,
        delay: () => void 0
    };
});

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

describe('engine Saga', () => {

    it('should run turn saga', async () => {
        const dispatched: AnyAction[] = [];

        await runSaga({
            dispatch: (action: AnyAction) => dispatched.push(action),
            getState: () => ({
                initGame: {
                    Player: attacker,
                    Enemy: defender,
                    resultLog: [],
                    playerWaiting: false,
                    log: {value: '', action: ''},
                    gameStart: true,
                    isLooser: false,
                    isPlayerWinner: false
                }
            })
        }, engineSagaWorker, {type: 'BATTLE/ENGINE/PLAYER_ATTACK', isEnemy: false, isCrit: false});

        expect(turn).toHaveBeenCalled();
        expect(turn).toHaveBeenCalledWith(attacker, defender, false, false, false);
    });

    it('should run Enemy turn saga and make enemy critical attack', async () => {
        const dispatched: AnyAction[] = [];

        await runSaga({
            dispatch: (action: AnyAction) => dispatched.push(action),
            getState: () => ({
                initGame: {
                    Player: defender,
                    Enemy: attacker,
                    resultLog: [],
                    playerWaiting: false,
                    log: {value: '', action: ''},
                    gameStart: true,
                    isLooser: false,
                    isPlayerWinner: false
                }
            })
        }, engineSagaWorker, {type: 'BATTLE/ENGINE/PLAYER_ATTACK', isEnemy: true, isCrit: false});

        expect(turn).toHaveBeenCalled();
        expect(turn).toHaveBeenCalledWith(attacker, defender, false, true, true);

    });

    it('should run Enemy turn saga and activate enemy heal', async () => {
        const dispatched: AnyAction[] = [];

        await runSaga({
            dispatch: (action: AnyAction) => dispatched.push(action),
            getState: () => ({
                initGame: {
                    Player: defender,
                    Enemy: {...attacker, countHP: 0.4},
                    resultLog: [],
                    playerWaiting: false,
                    log: {value: '', action: ''},
                    gameStart: true,
                    isLooser: false,
                    isPlayerWinner: false
                }
            })
        }, engineSagaWorker, {type: 'BATTLE/ENGINE/PLAYER_ATTACK', isEnemy: true, isCrit: false});

        expect(dispatched).toContainEqual(actions.healActivate(true));
        expect(dispatched).toContainEqual(actions.isWaiting());

    });
});