import { charsReducer } from './charsReducer';
import { actions } from '../../../init/rootActions';
import {Char, CharsState} from '../../../init/types/store';

const initialState = {
    chars: [],
    isLoading: false,
    offset: 0,
    requestLimit: 0
};

let newState: CharsState;

describe('Characters reducer', () => {

    it('should handle CHARS/CHARS_REQUEST action', () => {
        expect(newState = charsReducer(undefined, actions.charsRequest())).toEqual({
            ...initialState, isLoading: true
        });
    });

    it('should handle CHARS/END_CHARS_REQUEST action', () => {
        expect( newState = charsReducer(newState, actions.endCharsRequest())).toEqual({
            ...newState, isLoading: false
        });
    });

    it('should handle CHARS/CHARS_REQUEST_SUCCESS action', () => {
        const charsData: Char [] = [{
            stats: [{name: 'hp', base: 123}],
            baseHP: 125,
            countMP: 255,
            countHP: 100,
            baseMP: 125,
            name: 'Sasha',
            played: false,
            weight: 125,
            sprites: '...'
        }];

        expect(newState = charsReducer(newState, actions.charsRequestSuccess(charsData))).toEqual({
            ...newState, chars: charsData
        });

    });

    it('should handle CHARS/CHANGE_CHARS_REQUEST_OFFSET action', () => {
        let currentOffset = newState.offset;
        newState = charsReducer(newState, actions.changeCharsRequestOffset());
        expect(newState.offset).not.toEqual(currentOffset);

        currentOffset = newState.offset;
        expect(charsReducer(newState, actions.changeCharsRequestOffset()).offset).toBeGreaterThan(currentOffset);

    });

    it('should handle CHARS/SET_CHARS_COUNT action', () => {
        expect(charsReducer(newState, actions.setCharsCount(150))).toEqual({
            ...newState, requestLimit: 150
        });
    });

    it('should handle CHARS/SET_CHAR_PLAYED action', () => {
        expect(charsReducer(newState, actions.setCharPlayed('Sasha'))).toEqual({
            ...newState, chars: newState.chars.map(char => {
                return char.name === 'Sasha' ? {...char, played: true} : char;
            })
        });
    });

});