import { CharsState } from 'init/types/store';
import { CharsActionsType } from 'models/Chars/actions/charsActions';

const initialState: CharsState = {
    chars: [],
    isLoading: false,
    offset: 0,
    requestLimit: 0
};

export const charsReducer = (state = initialState, action: CharsActionsType): CharsState => {
    switch (action.type) {
        case 'CHARS/CHARS_REQUEST': {
            return {...state, isLoading: true};
        }
        case 'CHARS/END_CHARS_REQUEST': {
            return {...state, isLoading: false};
        }
        case 'CHARS/CHARS_REQUEST_SUCCESS': {
            return {...state, chars: [...state.chars, ...action.data]};
        }
        case 'CHARS/CHANGE_CHARS_REQUEST_OFFSET': {
            return {...state, offset: state.offset + Math.floor(300*Math.random()+200)};
        }
        case 'CHARS/SET_CHARS_COUNT': {
            return {...state, requestLimit: action.count};
        }
        
        default:
            // eslint-disable-next-line 
            const x = action;
            return state;
    }
};