import { fetchCharsWorker, getCharsDataWorker, getCountWorker, onLoadCharsAlertsWorker } from './charsSaga';
import { api } from '../../../api/api';
import { actions } from '../../../init/rootActions';
import { runSaga } from 'redux-saga';
import { AnyAction } from 'redux';
import { Char, CharsState } from '../../../init/types/store';
import { RootState } from '../../../init/store';
import { call, put } from 'redux-saga/effects';
import { throws } from 'assert';

describe('getCountWorker', () => {

    it('should get count from api and put count action', async () => {
        const dispatched: AnyAction[] = [];
        api.getCount = jest.fn(() => Promise.resolve(100));

        await runSaga({
            dispatch: (action: AnyAction) => dispatched.push(action),
            getState: () => ({state: 'test'})
        }, getCountWorker);

        expect(api.getCount).toHaveBeenCalledTimes(1);

        expect(dispatched).toContainEqual(actions.setCharsCount(100));

    });
});

describe('getCharsDataWorker', () => {

    it('should get characters from api and put action to set chars in store', async () => {

        const dispatched: AnyAction[] = [];
        api.getCharacters = jest.fn((offset: number) => Promise.resolve([{name: 'char1'}, {name: 'char2'}])) as jest.Mock;

        await runSaga({
            dispatch: (action: AnyAction) => dispatched.push(action),
            getState: () => ({state: 'test'})
        }, getCharsDataWorker, 15);

        expect(api.getCharacters).toHaveBeenCalledTimes(1);
        expect(api.getCharacters).toHaveBeenCalledWith(15);
        expect(dispatched).toContainEqual(actions.charsRequestSuccess([{name: 'char1'}, {name: 'char2'}] as Char []));
    });

});

describe('onLoadCharsAlertsWorker', () => {

    it('should select requested params and show load messages by putting suitable actions', async () => {
        const dispatched: AnyAction[] = [];

        await runSaga({
            dispatch: (action: AnyAction) => dispatched.push(action),
            getState: () => ({
                charsState: {
                    offset: 10,
                    requestLimit: 250
                } as CharsState
            })
        }, onLoadCharsAlertsWorker);

        const expectedActionPayload = {type: 'success', msg: 'Randomly chars have loaded'} as const;

        expect(dispatched).toContainEqual(actions.setMsg(expectedActionPayload));

    });

});

describe('fetchCharsWorker', () => {

    it('should call previous sagas and put end request action', () => {

        const generator = fetchCharsWorker({type: 'CHARS/CHARS_REQUEST', offset: 150});

        expect(generator.next().value).toEqual(call(getCountWorker));
        expect(generator.next().value).toEqual(call(getCharsDataWorker,150));
        expect(generator.next().value).toEqual(put(actions.endCharsRequest()));
        expect(generator.next().value).toEqual(put(actions.changeCharsRequestOffset()));
        expect(generator.next().value).toEqual(call(onLoadCharsAlertsWorker));

    });

    it('should catch error', async () => {

        const generator = fetchCharsWorker({type: 'CHARS/CHARS_REQUEST', offset: 150});
        generator.next();
        //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect((generator.throw!(new Error('error')).value)).toEqual(put(actions.setMsg({type: 'error', msg: 'server error, try later'})));
    });

});