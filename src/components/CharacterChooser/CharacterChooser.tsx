import React, {useEffect} from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import {connect, useDispatch} from 'react-redux';
import {actions} from '../../redux/actions/rootActions';
import {RootState} from '../../redux/store';
import {Dispatch} from 'redux';


const useStyles = makeStyles({
    container: {
        padding:'20px'
    }
});

type StateProps = {};
type DispatchProps = {
    onFetchChars: () => void;
}
type Props = StateProps & DispatchProps;


const CharacterChooser: React.FC<Props> = ({ onFetchChars }) => {
    const style = useStyles();

    useEffect(() => onFetchChars(),[]);

    return (
        <Grid container className={style.container}>
            <Grid item xs={12}>
                <Typography align='center' variant='h4' color='textPrimary'>
                    Be ready for the battle! Let`s start
                </Typography>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state: RootState): StateProps => {
    return {};
};
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        onFetchChars: () => dispatch(actions.fetchChars())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterChooser);