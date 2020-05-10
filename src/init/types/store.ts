import {Char} from 'api/types';

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



export type CharsState = {
    chars: Char[];
    isLoading: boolean;
    offset: number;
    requestLimit: number;
}
