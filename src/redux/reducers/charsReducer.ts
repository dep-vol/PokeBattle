import {CharsState} from '../../types/store';
import {ActionsType} from '../actions/rootActions';

const initialState: CharsState = {
    chars: [],
    isLoading: false
};

export const charsReducer = (state: CharsState = initialState, action: ActionsType): CharsState => {
    switch (action.type) {
        case 'LOADING_CHARS_START': {
            return {...state, isLoading: true};
        }
        case 'LOADING_CHARS_END': {
            return {...state, isLoading: false};
        }
        case 'SAVE_CHARS': {
            return {...state, chars: [...state.chars, ... action.data]};
        }
        default:
            return state;
    }
};