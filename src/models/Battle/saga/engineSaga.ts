import {actions, ExtractAction} from 'init/rootActions';
import {asyncEngineActions} from '../actions/engineActions';
import {RootState} from 'init/store';
import { select, call, put, takeEvery, all, delay } from 'redux-saga/effects';
import {Char} from 'init/types/store';

function* engineSagaWorker(action: ExtractAction<typeof asyncEngineActions.attackAction>) {
    const playerData = yield select((state: RootState) => state.initGame.Player);
    const enemyData = yield select((state: RootState) => state.initGame.Enemy);

    const calcDamage = (attacker: Char, defender: Char, isSpecial: boolean) => {
        const attackerStats: {[key: string]: number} = {};
        const defenderStats: {[key: string]: number} = {};

        attacker.stats.forEach((stat) => {
            attackerStats[stat.name] = stat.base;
        } );
        defender.stats.forEach((stat) => {
            defenderStats[stat.name] = stat.base;
        } );

        const baseAttack = (defenderStats['attack'] / attackerStats['attack']) * Math.random()*20;

        const damage = ((attackerStats['speed'] / defenderStats['speed']) * attackerStats['attack']*baseAttack) / defenderStats['defense'];
        const specDamage = attackerStats['special-attack'] / defenderStats['special-defense'];
        const defineDamage = isSpecial ? specDamage : damage;

        const hp = defenderStats['hp'] - defineDamage;
        return {damage: Math.round(defineDamage), hp: Math.round(hp)};
    };

    try {
        const isSpecial = Math.random()*100 > 90;

        if(action.isEnemy) {
            const {damage, hp} = yield call(calcDamage, enemyData, playerData, isSpecial);
            yield delay(2000);
            yield put(actions.makeAttack(hp, true));
            isSpecial
                ? yield all([
                    put(actions.setLogAction('Special defense activated!!! \n')),
                    put(actions.setLogAction(`${enemyData.name} attack ${playerData.name} and make ${damage} \n`))
                ])
                : yield put(actions.setLogAction(`${enemyData.name} attack ${playerData.name} and make ${damage} \n`));
        }
        else {
            const {damage, hp} = yield call(calcDamage, playerData, enemyData, isSpecial);
            yield put(actions.makeAttack(hp, false));
            isSpecial
                ? yield all([
                    put(actions.setLogAction('Special defense activated!!! \n')),
                    put(actions.setLogAction(`${playerData.name} attack ${enemyData.name} and make ${damage} \n`))
                ])
                : yield put(actions.setLogAction(`${playerData.name} attack ${enemyData.name} and make ${damage} \n`));
            yield put(actions.playerAttack(true));
        }
    }
    catch (e) {
        yield put(actions.setMsg({type: 'error', msg: e.message}));
    }
}

export default function* engineSagaWatcher(): Generator {
    yield takeEvery(asyncEngineActions.attackAction, engineSagaWorker);
}