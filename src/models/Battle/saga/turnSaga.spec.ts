import { actions } from '../../../init/rootActions';

jest.mock('redux-saga/effects', () => {
    const originalModule = jest.requireActual('redux-saga/effects');
    return {
        ...originalModule,
        delay: () => void 0
    };
});

import * as utils from './utils';
import { AnyAction } from 'redux';
import { runSaga } from 'redux-saga';
import * as testSaga from './turnSaga';
import { Char } from '../../../init/types/store';
import { put } from 'redux-saga/effects';
import { sendAlert } from './engineSaga';

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

const newEnemy: Char = {
    name: 'Pipup',
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

describe('isSpecialTurn', () => {
    it('should log special damage', async () => {

        const dispatched: AnyAction[] = [];
        const damage = 25;
        const attackMsg = `${attacker.name} attack ${defender.name} and make ${damage} damage \n\n`;
        const specDefMsg = 'Special defense activated!!! \n';

        await runSaga({
            dispatch: (action: AnyAction) => dispatched.push(action),
            getState: () => ({state: 'test'})
        }, testSaga.isSpecialTurn, attacker, defender, damage, true, false);

        expect(dispatched).toContainEqual(actions.setLogAction(specDefMsg));
        expect(dispatched).toContainEqual(sendAlert(specDefMsg, false, 'warning'));
        expect(dispatched).toContainEqual(actions.setLogAction(attackMsg));
    });

    it('should log ordinary attack', async () => {
        const dispatched: AnyAction[] = [];
        const damage = 25;
        const attackMsg = `${attacker.name} attack ${defender.name} and make ${damage} damage \n\n`;

        await runSaga({
            dispatch: (action: AnyAction) => dispatched.push(action),
            getState: () => ({state: 'test'})
        }, testSaga.isSpecialTurn, attacker, defender, damage, false, false);

        expect(dispatched).toContainEqual(actions.setLogAction(attackMsg));
        expect(dispatched).toContainEqual(sendAlert(` - ${damage}`, false));
    });

    it('should catch error', () => {
        const generator = testSaga.isSpecialTurn(attacker, defender, 25, false, false);
        generator.next();
        expect(generator.throw(new Error('error')).value).toEqual(put(actions.setMsg({type: 'error', msg: 'error'})));
    });
});

describe('turn saga', () => {

    it('should make and log ordinary turn', async () => {

        const calcDamageMockValues = {
            critAttack: 1,
            hp: 20,
            damage: 30
        };

        jest.spyOn(utils, 'calcDamage').mockReturnValue(calcDamageMockValues);

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
        }, testSaga.turn, attacker, defender, false, false, false);

        expect(dispatched).toContainEqual(actions.setLogAction('Your turn \n'));
        expect(dispatched).toContainEqual(actions.makeAttack(calcDamageMockValues.hp, false));
        expect(dispatched).toContainEqual(actions.playerAttack(true, false));

    });

    it('should log critical attack and reduce mp', async () => {
        const calcDamageMockValues = {
            critAttack: 2,
            hp: 40,
            damage: 30
        };

        jest.spyOn(utils, 'calcDamage').mockReturnValue(calcDamageMockValues);

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
        }, testSaga.turn, attacker, defender, false, false, true);

        expect(dispatched).toContainEqual(actions.reduceMP(attacker.baseMP - 20, false));
        expect(dispatched).toContainEqual(actions.setLogAction('Critical attack!!!! \n'));
        expect(dispatched).toContainEqual(sendAlert('Critical attack!!!!', false));

    });

    it('should check win state, replace enemy and push results to logger while have the winner', async () => {

        const dispatched: AnyAction[] = [];

        await runSaga({
            dispatch: (action: AnyAction) => dispatched.push(action),
            getState: () => ({
                initGame: {
                    Player: attacker,
                    Enemy: {...defender, countHP: 0},
                    resultLog: [],
                    playerWaiting: false,
                    log: {value: '', action: ''},
                    gameStart: true,
                    isLooser: false,
                    isPlayerWinner: false
                },
                charsState: {
                    chars: [attacker, {...defender, played: true}, newEnemy]
                }
            })
        }, testSaga.turn, attacker, defender, false, false, true);

        expect(dispatched).toContainEqual(actions.setLogAction(`${attacker.name} WIN!!!`));
        expect(dispatched).toContainEqual(actions.pushResultOfTheBattle());
        expect(dispatched).toContainEqual(actions.setCharPlayed(defender.name));
        expect(dispatched).toContainEqual(actions.setMsg({
            type: 'success',
            msg: 'Congratulations! You are the winner, but show must go on!',
            anchor: {horizontal:'center', vertical:'top'}
        }));
        expect(dispatched).toContainEqual(actions.clearLog());
        expect(dispatched).toContainEqual(actions.loadPlayer(attacker));
        expect(dispatched).toContainEqual(actions.loadEnemy(newEnemy));
        expect(dispatched).toContainEqual(actions.isWaiting());
    });

    it('should game over if player win all enemies', async () => {
        const dispatched: AnyAction[] = [];

        await runSaga({
            dispatch: (action: AnyAction) => dispatched.push(action),
            getState: () => ({
                initGame: {
                    Player: attacker,
                    Enemy: {...defender, countHP: 0},
                    resultLog: [],
                    playerWaiting: false,
                    log: {value: '', action: ''},
                    gameStart: true,
                    isLooser: false,
                    isPlayerWinner: false
                },
                charsState: {
                    chars: [attacker, {...defender, played: true}]
                }
            })
        }, testSaga.turn, attacker, defender, false, false, true);

        expect(dispatched).toContainEqual(actions.setMsg({type: 'success', msg: 'Congratulations! You are the champion my friend',  anchor: {horizontal:'center', vertical:'top'}}));
    });


});