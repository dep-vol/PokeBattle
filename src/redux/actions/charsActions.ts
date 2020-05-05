import {Char} from '../../types/api';

export const charsActions = {
    charsRequest: (offset = 0) => ({type: 'CHARS/CHARS_REQUEST', offset} as const),
    endCharsRequest: () => ({type: 'CHARS/END_CHARS_REQUEST'} as const),
    charsRequestSuccess: (data: Char[]) => ({type: 'CHARS/CHARS_REQUEST_SUCCESS', data} as const),
    changeCharsRequestOffset: () => ({type: 'CHARS/CHANGE_CHARS_REQUEST_OFFSET'} as const)
};
