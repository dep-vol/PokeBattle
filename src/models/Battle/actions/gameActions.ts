import {initGameActions} from './initGameActions';
import {engineActions} from './engineActions';
import {inferValues} from '../../../init/types/store';

export const gameActions = {
    ...initGameActions,
    ...engineActions
};

export type GameActions = ReturnType<inferValues<typeof gameActions>>;
