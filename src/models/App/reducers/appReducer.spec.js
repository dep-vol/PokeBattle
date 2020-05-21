import { actions } from '../../../init/rootActions';
import { appReducer } from './appReducer';

const initialState = {
    alert: {
        msg: '',
        type: undefined,
        anchor: {
            horizontal: 'center',
            vertical: 'bottom'
        }
    }
};

describe('App reducer', () => {

    it('should return initial State by default', function () {
        expect(appReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle APP/SET_MSG', () => {

        expect(appReducer(initialState, actions.setMsg({msg: 'Welcome', type: 'error'}))).toEqual({
            alert: { ...initialState.alert, msg: 'Welcome', type: 'error' }
        });

        const newState = {
            alert: {
                msg: 'Welcome',
                type: 'error',
                anchor: {
                    horizontal: 'center',
                    vertical: 'bottom'
                }
            }
        };

        expect(appReducer(newState, actions.setMsg({msg: 'By-by', type: 'success', anchor: {vertical: 'bottom', horizontal: 'center'}}))).toEqual(
            {
                alert: {...newState.alert, msg: 'By-by', type: 'success', anchor: {vertical: 'bottom', horizontal: 'center'}}
            }
        );


    });

});