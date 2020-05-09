import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import logo from '../../img/pokemon_logo.png';

const useStyles = makeStyles({
    container : {
        backgroundColor:'rgb(75, 75, 87)'
    },
    innerContainer: {
        padding: '20px',
        display: 'flex',
        alignItems: 'center'
    },

    logo: {
        marginRight:'25px',

        width: '60px',
        height: '55px'
    }
});



const Header: React.FC = () => {

    const style = useStyles();
    

    return (
        <Grid container className={style.container}>
            <Grid item xs={12}>
                <div className={style.innerContainer}>
                    <img className={style.logo} src={logo} alt='Logo' />
                    <Typography variant='h4' color='textPrimary'>
                        PokeBattle
                    </Typography>
                </div>
            </Grid>
        </Grid>

    );
};

export default Header;