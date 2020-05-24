//CORE
import { takeEvery, put, call, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
//TYPES
import { Char } from 'init/types/store';
//BLL
import { actions, ExtractAction } from 'init/rootActions';
import { api } from 'api/api';
import { getOffsetAndLimit, OffsetAndLimit } from 'init/selectors/selectors';
import { charsAsyncActions } from '../actions/charsActions';

export function* getCountWorker (): SagaIterator<void> {
    const count: number = yield call(api.getCount);
    yield put(actions.setCharsCount(count));
}

export function* getCharsDataWorker (offset: number): SagaIterator<void> {
    const charsData: Char[] = yield call(api.getCharacters, offset);
    yield put(actions.charsRequestSuccess(charsData));
}


export function* onLoadCharsAlertsWorker (): SagaIterator<void> {
    const requestParams: OffsetAndLimit = yield select(getOffsetAndLimit);
    requestParams.offset < requestParams.requestLimit 
        ? yield put(actions.setMsg({type: 'success', msg: 'Randomly chars have loaded'})) 
        : yield put(actions.setMsg({type: 'info', msg: 'All randomly chars have loaded. Update page to try more'}));
}


export function* fetchCharsWorker({offset}: ExtractAction<typeof charsAsyncActions.CHARS_REQUEST>): SagaIterator<void>{
    try {
        yield call(getCountWorker);
        yield call(getCharsDataWorker,offset);        
        yield put(actions.endCharsRequest());
        yield put(actions.changeCharsRequestOffset());
        yield call(onLoadCharsAlertsWorker);
    }
    catch {
        yield put(actions.setMsg({type: 'error', msg: 'server error, try later'}));
    }
}

export function* fetchCharsWatcher(): Generator {
    yield takeEvery(charsAsyncActions.CHARS_REQUEST, fetchCharsWorker);
}
