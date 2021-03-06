import { all } from 'redux-saga/effects';
import { fetchCharsWatcher } from 'models/Chars/saga/charsSaga';
import { initGameWatcher } from '../models/Battle/saga/initGameSaga';
import { engineSagaWatcher } from '../models/Battle/saga/engineSaga';

export function* rootSaga(): Generator {
    yield all([fetchCharsWatcher(), initGameWatcher(), engineSagaWatcher()]);
}