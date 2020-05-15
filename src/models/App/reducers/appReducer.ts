import { AppState } from 'init/types/store';
import { AppActions } from '../actions/appActions';

const initialState: AppState = {
    alert: {
        msg: '',
        type: undefined
    }
};

export const appReducer = (state = initialState, action: AppActions): AppState => {
    switch (action.type) {
        case 'APP/SET_MSG': {
            return {...state, alert: {...state.alert, ...action.alert}};
        }
        default: return state;
    }
};