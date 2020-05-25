import { AnyAction } from 'redux';
import { Char } from '../../../init/types/store';
import { runSaga } from 'redux-saga';
import { healingSagaWorker } from './skillsSaga';
import { actions } from '../../../init/rootActions';
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

describe('healing saga', () => {
    it('should activate healing, reduce mp by 10 and switch turn to the enemy', async () => {
        const dispatched: AnyAction[] = [];

        await runSaga({
            dispatch: (action: AnyAction) => dispatched.push(action),
            getState: () => ({
                initGame: {
                    Player: {
                        ...attacker,
                        stats: attacker.stats.map(stat => stat.name === 'hp' ? {...stat, base: 30} : stat)
                    },
                    Enemy: defender,
                    resultLog: [],
                    playerWaiting: false,
                    log: {value: '', action: ''},
                    gameStart: true,
                    isLooser: false,
                    isPlayerWinner: false
                }
            })
        }, healingSagaWorker, {type: 'BATTLE/ENGINE/HEAL_ACTION', isEnemy: false});

        // Player.stats[stat.name === hp] + baseHp * 40 / 100
        const hp = 30 + 40;
        const mp = 40 - 10;

        expect(dispatched).toContainEqual(actions.healing(hp, false));
        expect(dispatched).toContainEqual(actions.reduceMP(mp, false));
        expect(dispatched).toContainEqual(actions.playerAttack(true, false));

    });
    it('should heal, reduce mp by 10 when enemy activate healing and log healing by enemy', async () => {
        const dispatched: AnyAction[] = [];

        await runSaga({
            dispatch: (action: AnyAction) => dispatched.push(action),
            getState: () => ({
                initGame: {
                    Player: {
                        ...attacker,
                        stats: attacker.stats.map(stat => stat.name === 'hp' ? {...stat, base: 30} : stat)
                    },
                    Enemy: {
                        ...defender,
                        stats: defender.stats.map(stat => stat.name === 'hp' ? {...stat, base: 30} : stat)
                    },
                    resultLog: [],
                    playerWaiting: false,
                    log: {value: '', action: ''},
                    gameStart: true,
                    isLooser: false,
                    isPlayerWinner: false
                }
            })
        }, healingSagaWorker, {type: 'BATTLE/ENGINE/HEAL_ACTION', isEnemy: true});

        // Enemy.stats[stat.name === hp] + baseHp * 40 / 100
        const hp = 30 + 40;
        const mp = 40 - 10;

        expect(dispatched).toContainEqual(actions.healing(hp, true));
        expect(dispatched).toContainEqual(actions.reduceMP(mp, true));
        expect(dispatched).toContainEqual(actions.setLogAction(`Restore ${hp} HP`));
        expect(dispatched).toContainEqual(sendAlert('Healing now', false, 'warning'));
        expect(dispatched).toContainEqual(actions.setLogAction(' Your turn!!!'));
    });

});