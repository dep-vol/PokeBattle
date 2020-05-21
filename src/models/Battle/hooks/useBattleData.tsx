import {useDispatch, useSelector} from 'react-redux';
import {useCallback} from 'react';

import {actions} from 'init/rootActions';
import {
    getPlayerData,
    getEnemyData,
    getLoggerValue,
    getWaitingValue,
    getIsPlayerWinner, getIsLooser
} from 'init/selectors/selectors';

export const useBattleData = () => {
    const dispatch = useDispatch();

    const playerData = useSelector(getPlayerData);
    const enemyData = useSelector(getEnemyData);
    const loggerValue = useSelector(getLoggerValue);
    const waiting = useSelector(getWaitingValue);
    const isPlayerWinner = useSelector(getIsPlayerWinner);
    const isLooser = useSelector(getIsLooser);
    const playerMP =  playerData.stats.find(stat => stat.name === 'mp');
    const critAttackDisable = playerMP && playerMP.base < 20;

    const onPlayerAttack = useCallback(() => dispatch(actions.playerAttack(false, false)), [dispatch]);
    const onPlayerHealing = useCallback(() => dispatch(actions.healActivate(false)), [dispatch]);
    const onCriticalAttack = useCallback(() => dispatch(actions.playerAttack(false, true)), [dispatch]);

    return {
        playerData, enemyData, loggerValue,
        onPlayerAttack, waiting, onPlayerHealing,
        onCriticalAttack, isLooser, isPlayerWinner, critAttackDisable};
};