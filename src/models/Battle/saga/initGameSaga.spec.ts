import { initGameWorker } from './initGameSaga';
import { Char } from '../../../init/types/store';
import { AnyAction } from 'redux';
import { runSaga } from 'redux-saga';
import { actions } from '../../../init/rootActions';
import { put } from 'redux-saga/effects';


const player: Char = {
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
const enemy: Char = {
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

describe('init game saga', () => {
    it('should load player and enemy, put start action, push to battle page', async () => {

        const dispatched: AnyAction[] = [];
        const mockedHistory = jest.fn();


        await runSaga({
            dispatch: (action: AnyAction) => dispatched.push(action),
            getState: () => ({
                charsState: {
                    chars: [player, enemy]
                }
            })
        }, initGameWorker, {
            type: 'BATTLE/INIT_GAME/INIT_GAME',
            playerCharName: player.name,
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            history: { push: mockedHistory }
        });

        expect(dispatched).toContainEqual(actions.loadPlayer(player));
        expect(dispatched).toContainEqual(actions.loadEnemy(enemy));
        expect(dispatched).toContainEqual(actions.initialStart());
        expect(mockedHistory).toHaveBeenCalledWith('/battle');
    });

    it('should catch error', () => {
        const mockedHistory = jest.fn();

        const generator = initGameWorker({
            type: 'BATTLE/INIT_GAME/INIT_GAME',
            playerCharName: player.name,
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            history: { push: mockedHistory }
        });
        generator.next();
        //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect(generator.throw!(new Error('test error')).value).toEqual(put(actions.setMsg({type: 'error', msg: 'test error'})))
    });
});