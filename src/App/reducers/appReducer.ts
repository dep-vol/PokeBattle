import { AppActions, AppState } from 'App/types';

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