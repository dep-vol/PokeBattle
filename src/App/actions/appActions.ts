import { Alert } from 'init/types/store';

export const appActions = {
    setMsg: (alert: Alert) => ({type: 'APP/SET_MSG', alert} as const)
};