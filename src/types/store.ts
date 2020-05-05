import {Char} from './api';

export type CharsState = {
    chars: Char[];
    isLoading: boolean;
    offset: number;
    requestLimit: number;
}