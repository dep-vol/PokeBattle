import { inferValues, Alert } from 'init/types/store';
import { appActions } from 'App/actions/appActions';

export type AppActions = ReturnType<inferValues<typeof appActions>>;


export type AppState = {
    alert: Alert;
}