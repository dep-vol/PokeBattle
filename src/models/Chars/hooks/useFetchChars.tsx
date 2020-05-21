//CORE
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

//BLL
import { actions } from 'init/rootActions';
import { useHistory } from 'react-router-dom';
import { getLoadingState, getGameStartState, getChars, getOffset, getRequestLimit } from 'init/selectors/selectors';

export const useFetchChars = () => {

    const dispatch = useDispatch();

    const loadingChars = useSelector(getLoadingState, shallowEqual);
    const gameStart = useSelector(getGameStartState, shallowEqual);
    const isLoading = loadingChars || gameStart;

    const chars =  useSelector(getChars, shallowEqual);
    const offset = useSelector(getOffset, shallowEqual);
    const requestLimit = useSelector(getRequestLimit, shallowEqual);


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