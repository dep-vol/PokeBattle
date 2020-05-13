import { useSelector } from 'react-redux';
import { RootState } from '../../../init/store';

export const useBattleData = () => {
    const playerData = useSelector((state: RootState) => state.initGame.Player);
    const enemyData = useSelector((state: RootState) => state.initGame.Enemy);

    return {playerData, enemyData};
};