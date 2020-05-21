import React from 'react';
import {useSelector} from 'react-redux';

import {getResultLog} from 'init/selectors/selectors';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper  from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import {ExpansionList} from '../ExpansionList/ExpansionList';

export const Result = () => {

    const results = useSelector(getResultLog);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box my={3}>
                    <Typography align='center' variant='h4' color='textPrimary'>
                        Thank you for the game! You are welcome!
                    </Typography>
                </Box>
            </Grid>
            <Grid container justify='center'>
                <Grid item xs={10}>
                    <Paper elevation={8}>
                        <Box p={3} mb={3}>
                            <Typography align='center' variant='h6' color='textPrimary' gutterBottom>
                                Results:
                            </Typography>
                            <Typography align='center' variant='body1' component='div' color='textSecondary' gutterBottom>
                                <p>You defeat:</p>
                                <span>
                                    {results.length}
                                </span>
                                <span> enemies</span>
                            </Typography>
                            <Box my={2} justifyContent='center' display='flex' flexDirection = 'column' >
                                {results.map((enemyLog) => {
                                    return (
                                        <ExpansionList defeatedEnemyLog={enemyLog} key={enemyLog.enemy}/>
                                    );
                                })}
                                <p>Try more</p>
                            </Box>
                            <a href='/'>
                                <Button variant='contained' color='primary'>
                                    Go
                                </Button>
                            </a>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
};