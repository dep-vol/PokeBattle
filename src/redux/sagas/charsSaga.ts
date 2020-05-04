import { takeEvery, put, call } from 'redux-saga/effects';
import {asyncActionsTypes} from '../actions/asyncActions';
import {actions} from '../actions/rootActions';
import {api} from '../../api/api';
import {Char} from '../../types/api';
import {StrictEffect} from 'redux-saga/effects';


type fetchCharsWorkerType = Generator<StrictEffect, void, Char[]>;
/**
 * @yield StrictEffect
 * @yield_return Char[]
 * @returns void
 */
function* fetchCharsWorker(): fetchCharsWorkerType{
    yield put(actions.startLoadChars());
    const data = yield call([api, 'getCharacters']);
    yield put(actions.saveChars(data));
}

export default function* fetchCharsWatcher(): Generator {
    yield takeEvery(asyncActionsTypes.FETCH_CHARS, fetchCharsWorker);
}