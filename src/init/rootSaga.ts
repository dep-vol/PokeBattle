import { all } from 'redux-saga/effects';
import fetchCharsWatcher from 'models/Chars/saga/charsSaga';

export default function* (): Generator {
    yield all([fetchCharsWatcher()]);
}