//CORE
import React, { ReactElement } from 'react';

//UI VENDORS
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

//ELEMS
import { Loader } from 'elements/';
import { useFetchChars } from '../';
import Card from '@material-ui/core/Card';

import { CardItem } from './CardItem/CardItem';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '20px'
    },
    container: {
        padding:'20px'
    },
    card: {
        width: '250px',
        margin: '0 10px 20px',
        padding: '20px'
    },
    paging: {
        display: 'flex',
        justifyContent: 'center',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },

}));


export const CharsList: React.FC = (): ReactElement => {
    const { isLoading, loadingChars, chars, requestLimit, offset, onFetchChars, onInit } = useFetchChars();
    const style = useStyles();
    const CharsNodes = chars.map((char) => {
        return (
            <Card className={style.card} key={char.name} >
                <CardItem char={char}/>
                <div className={style.paging}>
                    <Button variant='contained' onClick={onInit(char.name)} disabled={isLoading}>
                        Choose
                    </Button>
                </div>
            </Card>
        );
    });
    return (
        <Grid container className={style.container}>
            <Grid item xs={12}>
                <Typography align='center' variant='h4' color='textPrimary'>
                    Be ready for the battle! Choose your random char
                </Typography>
                <div>
                    <div className={style.root}>
                        {CharsNodes}
                    </div>
                    <div>
                        {loadingChars && <Loader/>}
                    </div>
                    <div className={style.buttonContainer}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onFetchChars(offset)}
                            disabled={isLoading || offset >= requestLimit}
                        >
                            SHOW MORE
                        </Button>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
};
