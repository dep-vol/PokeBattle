import {Char} from '../../../init/types/store';
import {actions, ExtractAction} from '../../../init/rootActions';
import {asyncEngineActions} from '../actions/engineActions';
import {call, put, select} from 'redux-saga/effects';
import {EnemyDataType, getEnemyData, getPlayerData, PlayerDataType} from '../../../init/selectors/selectors';
import {sendAlert} from './engineSaga';
import {SagaIterator} from '@redux-saga/types/';

const healStatsCounter = (playerData: Char) => {
    const playerCurrentHP = playerData.stats.find(stat => stat.name === 'hp');
    const playerCurrentMP = playerData.stats.find(stat => stat.name === 'mp');

    const healCount = playerData.baseHP < 60
        ? Math.round((playerData.baseHP*70)/100)
        : Math.round((playerData.baseHP*40)/100);



    if (playerCurrentMP && playerCurrentHP) {
        const hp =  (playerCurrentHP.base + healCount) > playerData.baseHP ? playerData.baseHP : playerCurrentHP.base + healCount;
        const mp = playerCurrentMP.base - 10;

        return {hp, mp};
    }

    else throw new Error('Player and enemy stats not found');

};

export function* healingSagaWorker ({ isEnemy }: ExtractAction<typeof asyncEngineActions.healAction>): SagaIterator<void> {
    if (!isEnemy) yield put(actions.isWaiting());
    const playerData: PlayerDataType = yield select(getPlayerData);
    const enemyData: EnemyDataType = yield select(getEnemyData);

    if (!isEnemy) {
        const { hp, mp } = yield call(healStatsCounter, playerData);

        yield put(actions.healing(hp, isEnemy));
        yield put(actions.reduceMP(mp, isEnemy));
        yield put(actions.playerAttack(true));
    }

    else {
        const { hp, mp } = yield call(healStatsCounter, enemyData);
        yield put(actions.healing(hp, isEnemy));
        yield put(actions.reduceMP(mp, isEnemy));
        yield put(actions.setLogAction(`Restore ${hp} HP`));
        yield put(sendAlert('Healing now', false, 'warning'));
        yield put(actions.setLogAction(' Your turn!!!'));
    }
}

