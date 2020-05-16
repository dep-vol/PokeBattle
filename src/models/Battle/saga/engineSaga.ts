//CORE
import { select, call, put, takeEvery, all, delay } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/types/';

//BLL
import { actions, ExtractAction } from 'init/rootActions';
import { asyncEngineActions } from '../actions/engineActions';
import { RootState } from 'init/store';
import {
    EnemyDataType,
    getEnemyCountHP,
    getEnemyData, getPlayerCountHP,
    getPlayerData, getPlayers,
    PlayerDataType
} from '../../../init/selectors/selectors';

//TYPES
import { Char } from 'init/types/store';


const calcDamage = (attacker: Char, defender: Char, isSpecial: boolean) => {
    const attackerStats: {[key: string]: number} = {};
    const defenderStats: {[key: string]: number} = {};

    attacker.stats.forEach((stat) => {
        attackerStats[stat.name] = stat.base;
    } );
    defender.stats.forEach((stat) => {
        defenderStats[stat.name] = stat.base;
    } );

    const critAttack = (5 - Math.round((Math.random())*5)) === 5 ? 2 : 1;
    const baseAttack = attackerStats['attack'] - defenderStats['attack'] >=10
        ? 4
        : 8;

    const defenderShield = attackerStats['attack'] > defenderStats['attack']
        ? defenderStats['defense']
        : defenderStats['defense'] - (Math.round(Math.random()*5) + 5);

    const damage = (((attackerStats['attack'] * baseAttack / defenderShield) * attackerStats['speed']) * critAttack) / (Math.sqrt(defenderStats['hp'] * defenderStats['defense']));
    const specDamage = attackerStats['special-attack'] / defenderStats['special-defense'];
    const defineDamage = isSpecial ? specDamage : damage;

    const hp = defenderStats['hp'] - defineDamage;
    return {damage: Math.round(defineDamage), hp: Math.round(hp), critAttack};
};

function* playerTurn(playerData: PlayerDataType, enemyData: EnemyDataType, isSpecial: boolean): SagaIterator<void> {

    const { damage, hp, critAttack } = yield call(calcDamage, playerData, enemyData, isSpecial);

    yield put(actions.setLogAction('Your turn \n'));

    yield put(actions.makeAttack(hp, false));

    if (critAttack !== 1) yield put(actions.setLogAction('Critical attack!!!! \n'));

    isSpecial
        ? yield all([
            put(actions.setLogAction('Special defense activated!!! \n')),
            yield put(actions.setMsg({type: 'info', msg: 'Special defense activated!!!'})),
            put(actions.setLogAction(`${playerData.name} attack ${enemyData.name} and make ${damage} damage \n\n`))
        ])
        : yield put(actions.setLogAction(`${playerData.name} attack ${enemyData.name} and make ${damage} damage \n\n`));

    const enemyCountHP = yield select(getEnemyCountHP);

    if (enemyCountHP <= 0) {
        yield put(actions.setLogAction(`${playerData.name} WIN!!!`));
        yield put(actions.setCharPlayed(enemyData.name));
        const {enemy: newEnemy, player} = yield select((state: RootState) => getPlayers(state, playerData.name));
        if (newEnemy) {
            yield put(actions.setMsg({
                type: 'success',
                msg: 'Congratulations! You are the winner, but show must go on!'
            }));
            yield delay(4000);
            yield put(actions.clearLog());
            yield put(actions.loadPlayer(player));
            yield put(actions.loadEnemy(newEnemy));
        } else {
            yield put(actions.setMsg({type: 'success', msg: 'Congratulations! You are the champion my friend'}));
        }

    } else {
        yield put(actions.playerAttack(true));
    }

}

function* enemyTurn(playerData: PlayerDataType, enemyData: EnemyDataType, isSpecial: boolean): SagaIterator<void> {
    const {damage, hp, critAttack} = yield call(calcDamage, enemyData, playerData, isSpecial);
    yield put(actions.setLogAction('Enemy turn \n'));
    yield delay(2300);
    yield put(actions.makeAttack(hp, true));
    if(critAttack !== 1) yield put(actions.setLogAction('Critical attack!!!! \n'));
    isSpecial
        ? yield all([
            put(actions.setLogAction('Special defense activated!!! \n')),
            yield put(actions.setMsg({type: 'info', msg: 'Special defense activated!!!'})),
            put(actions.setLogAction(`${enemyData.name} attack ${playerData.name} and make ${damage} damage \n\n`))
        ])
        : yield put(actions.setLogAction(`${enemyData.name} attack ${playerData.name} and make ${damage} damage \n\n`));

    const playerCountHP = yield select(getPlayerCountHP);

    if(playerCountHP <=0) {
        yield put(actions.setLogAction(`${enemyData.name} WIN!!!`));
        yield put(actions.setMsg({type: 'warning', msg: 'You are looser, try more!!!'}));
    }
}

function* engineSagaWorker(action: ExtractAction<typeof asyncEngineActions.attackAction>): SagaIterator<void> {
    const playerData: PlayerDataType = yield select(getPlayerData);
    const enemyData: EnemyDataType = yield select(getEnemyData);

    try {
        const isSpecial = Math.random()*100 > 75;

        if(action.isEnemy) {
            yield call(enemyTurn, playerData, enemyData, isSpecial);
        }
        else {
            yield call(playerTurn, playerData, enemyData, isSpecial);
        }
    }
    catch (e) {
        yield put(actions.setMsg({type: 'error', msg: e.message}));
    }
}

export default function* engineSagaWatcher(): Generator {
    yield takeEvery(asyncEngineActions.attackAction, engineSagaWorker);
}