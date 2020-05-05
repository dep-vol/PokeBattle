import React, { useEffect, Suspense } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { actions } from '../../redux/actions/rootActions';
import { RootState } from '../../redux/store';
import { Dispatch } from 'redux';
import { Char } from '../../types/api';
import Loader from '../Loader/Loader';

const CharsSet = React.lazy(() => import('../CharsSet/CharsSet'));

const useStyles = makeStyles({
    container: {
        padding:'20px'
    }
});

type StateProps = {
    isLoading: boolean;
    chars: Char[];
    offset: number;
    requestLimit: number
};
type DispatchProps = {
    onFetchChars: () => void;
}
type Props = StateProps & DispatchProps;


const CharacterChooser: React.FC<Props> = ({ onFetchChars, isLoading, chars, offset, requestLimit }) => {
    const style = useStyles();

    useEffect(() => {
        ( () => onFetchChars() )();
    },[onFetchChars]);

    return (
        <Grid container className={style.container}>
            <Grid item xs={12}>
                <Typography align='center' variant='h4' color='textPrimary'>
                    Be ready for the battle! Choose your random char
                </Typography>
                <Suspense fallback={<Loader />}>
                    <CharsSet isLoading={isLoading} chars={chars} onFetchChars={onFetchChars} offset={offset} requestLimit={requestLimit}/>
                </Suspense>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state: RootState): StateProps => {
    return {
        isLoading: state.charsState.isLoading,
        chars: state.charsState.chars,
        offset: state.charsState.offset,
        requestLimit: state.charsState.requestLimit
    };
};
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        onFetchChars: (offset = 0) => dispatch(actions.charsRequest(offset))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterChooser);