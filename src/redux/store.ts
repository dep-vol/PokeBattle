import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import {charsReducer} from './reducers/charsReducer';
import rootSaga from './sagas/rootSaga';
import { appReducer } from './reducers/appReducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    charsState: charsReducer,
    app: appReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;