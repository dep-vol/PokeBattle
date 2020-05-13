import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import {charsReducer} from 'models/Chars/reducers/charsReducer';
import rootSaga from 'init/rootSaga';
import { appReducer } from 'models/App/reducers/appReducer';
import { initGameReducer } from '../models/Battle/reducers/initGameReducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    charsState: charsReducer,
    app: appReducer,
    initGame: initGameReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;