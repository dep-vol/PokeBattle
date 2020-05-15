import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '../../../init/store';
import {useCallback} from 'react';
import {actions} from '../../../init/rootActions';

export const useBattleData = () => {
    const dispatch = useDispatch();

    const playerData = useSelector((state: RootState) => state.initGame.Player);
    const enemyData = useSelector((state: RootState) => state.initGame.Enemy);
    const loggerValue = useSelector((state: RootState) => state.initGame.log.value);

    const onPlayerAttack = useCallback(() => dispatch(actions.playerAttack(false)), [dispatch]);

    return {playerData, enemyData, loggerValue, onPlayerAttack};
};