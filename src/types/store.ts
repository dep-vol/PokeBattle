import {Char} from './api';

/* ITEMS TYPES */
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

export type AppState = {
    alert: Alert;
}