//CORE
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
//TYPES
import { RootState } from 'init/store';
//BLL
import { actions } from 'init/rootActions';
import { useHistory } from 'react-router-dom';

export const useFetchChars = () => {

    const dispatch = useDispatch();

    const loadingChars = useSelector((state: RootState) => state.charsState.isLoading, shallowEqual);
    const gameStart = useSelector((state: RootState) => state.initGame.gameStart, shallowEqual);
    const isLoading = loadingChars || gameStart;

    const chars =  useSelector((state: RootState) => state.charsState.chars, shallowEqual);
    const offset = useSelector((state: RootState) => state.charsState.offset, shallowEqual);
    const requestLimit = useSelector((state: RootState) => state.charsState.requestLimit, shallowEqual);


    const history = useHistory();

    useEffect(() => {
        (() => {
            if (offset === 0) {
                dispatch(actions.charsRequest(0));
            }
        })();
    }, [dispatch, offset]);

    const onFetchChars = useCallback((offset = 0) =>() => {
        dispatch(actions.charsRequest(offset));
    },[dispatch]);

    const onInit = useCallback((name) => () => {
        dispatch(actions.initGame(name, history));
    },[dispatch, history]);



    return {isLoading, loadingChars, chars, offset, requestLimit, onFetchChars, onInit};
};