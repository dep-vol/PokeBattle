import { select, call, put, takeEvery, all, delay } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/types/';

import { actions, ExtractAction } from 'init/rootActions';
import { asyncEngineActions } from '../actions/engineActions';

import { EnemyDataType, getEnemyData, getPlayerData, PlayerDataType } from '../../../init/selectors/selectors';

import {Alert} from 'init/types/store';
import {healingSagaWorker} from './skillsSaga';
import {turn} from './turnSaga';


/*
 * Return alert action on diff side enemy or player
 */
export const sendAlert = ( msg: string, isEnemy: boolean, type: Alert['type'] = 'info') => {
    return isEnemy
        ? actions.setMsg({type: type, msg, anchor: {vertical:'top', horizontal:'left'}})
        : actions.setMsg({type: type, msg, anchor: {vertical:'top', horizontal:'right'}});
};


function* engineSagaWorker(action: ExtractAction<typeof asyncEngineActions.attackAction>): SagaIterator<void> {
    if (!action.isEnemy) yield put(actions.isWaiting());
    const playerData: PlayerDataType = yield select(getPlayerData);
    const enemyData: EnemyDataType = yield select(getEnemyData);
    const enemyMP = enemyData.stats.find(stat => stat.name === 'mp');

    try {
        const isSpecial = Math.random()*100 > 75;

        if(action.isEnemy) {
            if(enemyMP && enemyMP.base >= 10 && enemyData.countHP <= 0.5) {
                yield delay(2000);
                yield put(actions.healActivate(true));
                yield put(actions.isWaiting());
            }
            else {
                yield call(turn, enemyData, playerData, isSpecial, true);
                yield put(actions.isWaiting());
            }
        }
        else {
            yield call(turn, playerData, enemyData, isSpecial, false);
        }
    }
    catch (e) {
        yield put(actions.setMsg({type: 'error', msg: e.message}));
    }
}




export default function* engineSagaWatcher(): Generator {
    yield all([
        takeEvery(asyncEngineActions.attackAction, engineSagaWorker),
        takeEvery(asyncEngineActions.healAction, healingSagaWorker)
    ]);
}