import {Char} from '../../types/api';

export const charsActions = {
    startLoadChars: () => ({type: 'LOADING_CHARS_START'} as const),
    endLoadChars: () => ({type: 'LOADING_CHARS_END'} as const),
    saveChars: (data: Char[]) => ({type: 'SAVE_CHARS', data} as const),
};

