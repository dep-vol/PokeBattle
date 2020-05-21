import React from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import {Badge, Card} from '@material-ui/core';
import {CardItem} from 'models/Chars/components/CardItem/CardItem';
import {useBattleData} from '../hooks/useBattleData';
import makeStyles from '@material-ui/styles/makeStyles/makeStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import heal from 'img/heal.png';
import superAttack from 'img/super_attack.png';
import {Redirect} from 'react-router-dom';

const useStyles = makeStyles({
    container: {
        padding: '20px'
    },
    card: {
        width: '250px'
    },
    playersContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    playerCard: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: '10px',
        '& .actions': {
            paddingLeft: '10px',
            margin: '10px 0',
            '& button' : {
                marginRight: '10px',
            }
        }
    },
    loggerContainer: {
        marginTop: '10px',
        '& div': {
            width: '375px',

            '& textarea': {
                color: '#757575',
                lineHeight: '1.75',
                fontStyle: 'oblique',
                fontFamily: 'monospace',
                fontSize: 'inherit'
            }
        }
    },


});

export const Battle: React.FC = () => {

    const style = useStyles();

    const {
        playerData, enemyData, loggerValue,
        onPlayerAttack, waiting, onPlayerHealing,
        onCriticalAttack, isLooser, isPlayerWinner, critAttackDisable
    } = useBattleData();

    const skillDisabled = waiting || playerData.countMP === 0;

    if (isPlayerWinner || isLooser) {
        return <Redirect to='/result'/>;
    }

    return (
        <Grid container className={style.container}>
            <Grid item xs={12} className={style.playersContainer}>
                <div className={style.playerCard}>
                    <Card className={style.card}>
                        <CardItem char={playerData}/>
                    </Card>
                    <div className='actions'>
                        <Button variant='outlined' color='secondary' onClick={onPlayerAttack} disabled={waiting}>
                            Attack
                        </Button>
                        <Badge color="primary" badgeContent='10 MP' >
                            <Button variant='contained' color='default' onClick={onPlayerHealing} disabled={skillDisabled}>
                                <img src={heal} alt='heal' />
                            </Button>
                        </Badge>
                        <Badge color="primary" badgeContent='20 MP' >
                            <Button variant='contained' color='default' onClick={onCriticalAttack} disabled={skillDisabled || critAttackDisable}>
                                <img src={superAttack} alt='heal' />
                            </Button>
                        </Badge>
                        <div className={style.loggerContainer}>
                            <TextField
                                id="logger"
                                label="Logger"
                                value={loggerValue}
                                multiline
                                rowsMax={15}
                                size='medium'
                            />
                        </div>
                    </div>
                </div>

                <Card className={style.card}>
                    <CardItem char={enemyData}/>
                </Card>
            </Grid>

        </Grid>
    );
};