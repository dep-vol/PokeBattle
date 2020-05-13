//CORE
import React, { useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
//TYPES
import { RootState } from 'init/store';
//BLL
import { actions } from 'init/rootActions';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

type onFetchChars = (offset?: number) => void

export const useFetchChars = () => {

    const dispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.charsState.isLoading, shallowEqual);
    const chars =  useSelector((state: RootState) => state.charsState.chars, shallowEqual);
    const offset = useSelector((state: RootState) => state.charsState.offset, shallowEqual);
    const requestLimit = useSelector((state: RootState) => state.charsState.requestLimit, shallowEqual);

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
        dispatch(actions.initGame(name));
    },[dispatch]);



    return {isLoading, chars, offset, requestLimit, onFetchChars, onInit};
};