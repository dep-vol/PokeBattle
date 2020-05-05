import { takeEvery, put, call } from 'redux-saga/effects';
import {actions, ActionsConstants, ActionsType} from '../actions/rootActions';
import {api} from '../../api/api';
import {Char} from '../../types/api';
import {StrictEffect} from 'redux-saga/effects';
import { AnyAction } from 'redux';


type fetchCharsWorkerType = Generator<StrictEffect, void, Char[]>;
/**
 * @yield StrictEffect
 * @yield_return Char[]
 * @returns void
 */
function* fetchCharsWorker(action: AnyAction): fetchCharsWorkerType{
    try {
        const data = yield call(api.getCharacters, action.offset);
        yield put(actions.charsRequestSuccess(data));
        yield put(actions.endCharsRequest());
        yield put(actions.changeCharsRequestOffset());
    }
    catch {
        console.log('error');
    }
}

export default function* fetchCharsWatcher(): Generator {
    yield takeEvery<ActionsConstants>('CHARS/CHARS_REQUEST', fetchCharsWorker);
}