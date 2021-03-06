//CORE
import React from 'react';
//UI VENDOR
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
//ASSETS
import logo from 'img/pokemon_logo.png';
import {Button} from '@material-ui/core';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
    container: {
        backgroundColor: 'rgb(75, 75, 87)'
    },
    innerContainer: {
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    logoContainer: {
        display: 'flex',
        alignItems: 'center'
    },

    logo: {
        marginRight: '25px',

        width: '60px',
        height: '55px'
    }
});


export const Header: React.FC = () => {

    const style = useStyles();


    return (
        <Grid container className={style.container}>
            <Grid item xs={12}>
                <div className={style.innerContainer}>
                    <a href='/'>
                        <div className={style.logoContainer}>
                            <img className={style.logo} src={logo} alt='Logo'/>
                            <Typography variant='h4' color='textPrimary'>
                                PokeBattle
                            </Typography>
                        </div>
                    </a>
                    <Link to='/result'>
                        <Button variant='outlined'>
                            Finish
                        </Button>
                    </Link>
                </div>
            </Grid>
        </Grid>

    );
};
