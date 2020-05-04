import { all } from 'redux-saga/effects';
import fetchCharsWatcher from './charsSaga';

export default function* (): Generator {
    yield all([fetchCharsWatcher()]);
}