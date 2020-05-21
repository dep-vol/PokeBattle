import React from 'react';
import { useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper  from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';


export const Welcome: React.FC = () => {

    const history = useHistory();

    const handleClick = () => {
        history.push('/chars');
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box my={3}>
                    <Typography align='center' variant='h4' color='textPrimary'>
                        Welcome to the PokeBattle!
                    </Typography>
                </Box>
            </Grid>
            <Grid container justify='center'>
                <Grid item xs={10}>
                    <Paper elevation={8}>
                        <Box p={3} mb={3}>
                            <Typography align='center' variant='h6' color='textPrimary' gutterBottom>
                                About:
                            </Typography>
                            <Typography align='center' variant='body1' component='div' color='textSecondary' gutterBottom>
                                <p>This is 1 x 1 battle with two pokemons against each other.</p>
                                <p>You should choose your pokemon in randomly list of chars.</p>
                                <p>If you did not find your pokemon reload the page to get another list.</p>
                                <p>Let`s start!</p>
                            </Typography>
                            <Box my={2} justifyContent='center' display='flex'>
                                <Button variant='contained' color='primary' onClick={handleClick}>
                                    Go
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
};