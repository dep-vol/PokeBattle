import { ActionsType } from '../actions/rootActions';
import { AppState } from '../../types/store';

const initialState: AppState = {
    alert: {
        msg: '',
        type: undefined
    }
};

export const appReducer = (state = initialState, action: ActionsType): AppState => {
    switch (action.type) {
        case 'APP/SET_MSG': {
            return {...state, alert: {...state.alert, ...action.alert}};
        }
        default: return state;
    }
};