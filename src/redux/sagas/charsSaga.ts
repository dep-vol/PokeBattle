import { takeEvery, put, call, select } from 'redux-saga/effects';
import { actions, ExtractAction, asyncActions } from '../actions/rootActions';
import { api } from '../../api/api';
import { Char } from '../../types/api';
import { StrictEffect } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { RootState } from '../store';



/**
 * @yield StrictEffect
 * @next number
 * @return void
 */
function* getCountWorker (): Generator<StrictEffect, void, number> {
    const count = yield call(api.getCount);
    yield put(actions.setCharsCount(count));
}


/**
 * @yield StrictEffect
 * @next Char[]
 * @returns void
 */
function* getCharsDataWorker (offset: number): Generator<StrictEffect, void, Char[]> {
    const charsData = yield call(api.getCharacters, offset);
    yield put(actions.charsRequestSuccess(charsData));
}


/**
 * @yield StrictEffect
 * @next {offset: number; requestLimit: number}
 * @returns void
 */
function* onLoadCharsAlertsWorker (): Generator<StrictEffect, void, {offset: number; requestLimit: number}> {
    const requestParams = yield select((state: RootState) => {
        return {offset: state.charsState.offset, requestLimit: state.charsState.requestLimit};
    });
    requestParams.offset < requestParams.requestLimit ?
        yield put(actions.setMsg({type: 'success', msg: 'Randomly chars have loaded'})) :
        yield put(actions.setMsg({type: 'info', msg: 'All randomly chars have loaded. Update page to try more'}));
}


/**
 * @yield StrictEffect *from SagaIterator type
 * @returns void
 */
function* fetchCharsWorker({offset}: ExtractAction<typeof asyncActions.CHARS_REQUEST>): SagaIterator<void>{
    try {
        yield* getCountWorker();
        yield* getCharsDataWorker(offset);        
        yield put(actions.endCharsRequest());
        yield put(actions.changeCharsRequestOffset());
        yield* onLoadCharsAlertsWorker();
    }
    catch {
        yield put(actions.setMsg({type: 'error', msg: 'server error, try later'}));
    }
}

export default function* fetchCharsWatcher(): Generator {
    yield takeEvery(asyncActions.CHARS_REQUEST, fetchCharsWorker);
}
