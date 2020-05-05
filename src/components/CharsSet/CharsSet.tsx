import React from 'react';
import { Char } from '../../types/api';
import Loader from '../Loader/Loader';
import { Avatar, Button, Card, CardContent, CardHeader, List, ListItem, ListItemText } from '@material-ui/core';
import { CharsList } from '../index';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px'
    }
});

type Props = {
    isLoading: boolean;
    chars: Char[];
    offset: number;
    requestLimit: number;
    onFetchChars: (offset: number) => void;
}

const CharsSet: React.FC<Props> = ({ isLoading, chars, onFetchChars, offset, requestLimit }) => {

    const style = useStyles();

    return (
        <div>
            <div>
                <CharsList isLoading={isLoading} chars={chars}/>
            </div>
            <div className={style.buttonContainer}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onFetchChars(offset)}
                    disabled={isLoading ||offset > requestLimit}
                >
                    SHOW MORE
                </Button>
            </div>
        </div>
    );
};

export default CharsSet;

