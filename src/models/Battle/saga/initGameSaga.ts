import { takeEvery, select, put, call } from 'redux-saga/effects';
import { actions, ExtractAction } from '../../../init/rootActions';
import { SagaIterator } from '@redux-saga/types';
import { asyncInitGameActions } from '../actions/initGameActions';
import { RootState } from '../../../init/store';
import { getPlayers, PlayersSelectType } from '../../../init/selectors/selectors';


function* initGameWorker({playerCharName, history}: ExtractAction<typeof asyncInitGameActions.INIT_GAME_ACTION>): SagaIterator<void> {
    try {
        const goToBattle = () => history.push('/battle');

        const { player, enemy }: PlayersSelectType = yield select((state: RootState) => getPlayers(state, playerCharName));
        if(player && enemy) {
            yield put(actions.loadPlayer(player));
            yield put(actions.loadEnemy(enemy));
            yield put(actions.initialStart());
            yield call(goToBattle);
        } else {
            yield put(actions.setMsg({type:'error', msg: 'Error with player choosing try later...'}));
        }
    }
    catch (error) {
        yield put(actions.setMsg({type: 'error', msg: error.message}));
    }


}


export default function* initGameWatcher (): Generator {
    yield takeEvery(asyncInitGameActions.INIT_GAME_ACTION, initGameWorker);
}