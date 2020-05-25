import { Char } from '../../../init/types/store';
import { call, delay, put, select } from 'redux-saga/effects';
import { actions } from '../../../init/rootActions';
import { getEnemyCountHP, getPlayerCountHP, getPlayers } from '../../../init/selectors/selectors';
import { RootState } from '../../../init/store';
import { sendAlert } from './engineSaga';
import { SagaIterator } from '@redux-saga/types/';
import { calcDamage } from './utils';



/**
 ** Saga for work undo special defence if switched or common attack
 **/
export function* isSpecialTurn (attacker: Char, defender: Char, damage: number, isSpecial: boolean, isEnemy: boolean) {

    try {
        const attackMsg = `${attacker.name} attack ${defender.name} and make ${damage} damage \n\n`;
        const specDefMsg = 'Special defense activated!!! \n';

        if (isSpecial) {
            yield put(actions.setLogAction(specDefMsg));
            yield put(sendAlert(specDefMsg, isEnemy, 'warning'));
            yield delay(1600);
            yield put(actions.setLogAction(attackMsg));
        }
        else {
            yield put(actions.setLogAction(attackMsg));
            yield put(sendAlert(` - ${damage}`, isEnemy));
        }
    } catch (error) {
        yield put(actions.setMsg({type: 'error', msg: error.message}));
    }
    
}

export function* turn (attacker: Char, defender: Char, isSpecial: boolean, isEnemy: boolean, isCrit: boolean): SagaIterator<void> {

    try {
        const { damage, hp, critAttack } =  yield call(calcDamage, attacker, defender, isSpecial, isCrit);
        
        //Init messages of turn
        if(isEnemy) {
            yield put(actions.setLogAction('Enemy turn \n'));
            yield delay(1500);
        }
        else {
            yield put(actions.setLogAction('Your turn \n'));
        }
    
        yield delay(500);
        
        //Make ordinary attack
        yield put(actions.makeAttack(hp, isEnemy));
    
        //Critical attack and crit skill section
        if(critAttack !== 1) {
            if (isCrit) {
                const mp = attacker.stats.find(stat => stat.name === 'mp');
    
                if(mp && mp.base >= 20) yield put(actions.reduceMP(mp.base - 20, isEnemy));
            }
            yield put(actions.setLogAction('Critical attack!!!! \n'));
            yield put(sendAlert('Critical attack!!!!', isEnemy));
            yield delay(1600);
        }
        
        //Define special turn
        yield call(isSpecialTurn, attacker, defender, damage, isSpecial, isEnemy);
    
        //Calculate winner logic
        if(isEnemy) {
            const playerCountHP = yield select(getPlayerCountHP);
    
            if(playerCountHP <=0) {
                yield put(actions.setLogAction(`${attacker.name} WIN!!!`));
                yield put(actions.setMsg({type: 'warning', msg: 'You are looser, try more!!!'}));
                yield delay(2000);
                yield put(actions.setIsLooser());
            }
        }
        else {
            const enemyCountHP = yield select(getEnemyCountHP);
    
            if (enemyCountHP <= 0) {
                yield put(actions.setLogAction(`${attacker.name} WIN!!!`));
                yield put(actions.pushResultOfTheBattle());
                yield put(actions.setCharPlayed(defender.name));
                const {enemy: newEnemy, player} = yield select((state: RootState) => getPlayers(state, attacker.name));
                if (newEnemy) {
                    yield put(actions.setMsg({
                        type: 'success',
                        msg: 'Congratulations! You are the winner, but show must go on!',
                        anchor: {horizontal:'center', vertical:'top'}
                    }));
                    yield delay(3000);
                    yield put(actions.clearLog());
                    yield put(actions.loadPlayer(player));
                    yield put(actions.loadEnemy(newEnemy));
                    yield put(actions.isWaiting());
                } else {
                    yield put(actions.setMsg({type: 'success', msg: 'Congratulations! You are the champion my friend',  anchor: {horizontal:'center', vertical:'top'}}));
                    yield delay(2000);
                    yield put(actions.playerIsWinner());
                }
    
            } else {
                //switch to enemy turn
                yield put(actions.playerAttack(true, false));
            }
    
        } 
    } catch (error) {
        yield put(actions.setMsg({type: 'error', msg: error.message}));
    }
    

}




