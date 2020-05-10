//CORE
import React, { useEffect, Suspense } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
//UI VENDOR
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
//TYPES
import { RootState } from 'init/store';
import { Char } from 'api/types';
//BLL
import { actions } from 'init/rootActions';
//ELEMS
import { Loader } from 'elements/';
//MODELS
import { CharsList } from 'models/Chars';


const useStyles = makeStyles({
    container: {
        padding:'20px'
    }
});

type StateProps = {
    isLoading: boolean;
    chars: Char[];
    offset: number;
    requestLimit: number;
};
type DispatchProps = {
    onFetchChars: () => void;
}
type Props = StateProps & DispatchProps;


const CharacterChooser: React.FC<Props> = (props) => {

    const { onFetchChars, isLoading, chars, offset, requestLimit } = props;

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
                    <CharsList isLoading={isLoading} chars={chars} onFetchChars={onFetchChars} offset={offset} requestLimit={requestLimit}/>
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