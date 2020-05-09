import {Char} from '../../types/api';

export const charsAsyncActions = {
    CHARS_REQUEST: 'CHARS/CHARS_REQUEST' as const, 
};

export const charsActions = {
    
    endCharsRequest: () => ({type: 'CHARS/END_CHARS_REQUEST'} as const),
    charsRequestSuccess: (data: Char[]) => ({type: 'CHARS/CHARS_REQUEST_SUCCESS', data} as const),
    changeCharsRequestOffset: () => ({type: 'CHARS/CHANGE_CHARS_REQUEST_OFFSET'} as const),
    setCharsCount: (count: number) => ({type: 'CHARS/SET_CHARS_COUNT', count} as const),
    /************************************** 
    **ASYNC ACTION_CREATORS
    **************************************/
    charsRequest: (offset = 0) => ({type: charsAsyncActions.CHARS_REQUEST, offset} as const),
    assddd: () => ({type:'dfsdf'} as const)
};



