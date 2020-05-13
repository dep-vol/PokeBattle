import { all } from 'redux-saga/effects';
import fetchCharsWatcher from 'models/Chars/saga/charsSaga';
import initGameWatcher from '../models/Battle/saga/initGameSaga';

export default function* (): Generator {
    yield all([fetchCharsWatcher(), initGameWatcher()]);
}