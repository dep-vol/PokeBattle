import { Char } from 'init/types/store';
import { inferValues } from 'init/types/store';


export const charsAsyncActions = {
    CHARS_REQUEST: 'CHARS/CHARS_REQUEST' as const, 
};


export const charsActions = {
    /************************************** 
    **SYNC ACTION_CREATORS
    **************************************/
    endCharsRequest: () => ({type: 'CHARS/END_CHARS_REQUEST'} as const),
    charsRequestSuccess: (data: Char[]) => ({type: 'CHARS/CHARS_REQUEST_SUCCESS', data} as const),
    changeCharsRequestOffset: () => ({type: 'CHARS/CHANGE_CHARS_REQUEST_OFFSET'} as const),
    setCharsCount: (count: number) => ({type: 'CHARS/SET_CHARS_COUNT', count} as const),
    /************************************** 
    **ASYNC ACTION_CREATORS
    **************************************/
    charsRequest: (offset = 0) => ({type: charsAsyncActions.CHARS_REQUEST, offset} as const),
};

export type CharsActionsType = ReturnType<inferValues<typeof charsActions>>;



