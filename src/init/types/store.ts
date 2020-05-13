import {Char} from 'api/types';
import { appActions } from '../../models/App/actions/appActions';

/********************************** 
 ** TYPES METHODS 
 **********************************/
export type inferValues<T> = T extends {[key: string]: infer U} ? U : never;
export type inferActions<T> = T extends {['type']: infer U} ? U : never;


/**********************************
 ** ITEMS TYPES
 **********************************/
export type Alert = {
    msg: string;
    type: 'success' | 'info' | 'warning' | 'error' | undefined;
}

/**********************************
 ** STATE TYPES
 **********************************/

export type CharsState = {
    chars: Char[];
    isLoading: boolean;
    offset: number;
    requestLimit: number;
}

export type AppState = {
    alert: Alert;
}

export type PlayerState = {
    Player: Char;
    Enemy: Char;
    loading: boolean;
};