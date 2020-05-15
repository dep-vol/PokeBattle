import React from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import {Card} from '@material-ui/core';
import {CardItem} from 'models/Chars/components/CardItem/CardItem';
import {useBattleData} from '../hooks/useBattleData';
import makeStyles from '@material-ui/styles/makeStyles/makeStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
        '& .actions': {
            marginLeft: '10px'
        }
    },
    loggerContainer: {
        padding: '20px',
        '& div': {
            width: '100%'
        }
    }


});

export const Battle: React.FC = () => {

    const style = useStyles();

    const { playerData, enemyData, loggerValue, onPlayerAttack } = useBattleData();
    
    return (
        <Grid container className={style.container}>
            <Grid item xs={12} className={style.playersContainer}>
                <div className={style.playerCard}>
                    <Card className={style.card}>
                        <CardItem char={playerData}/>
                    </Card>
                    <div className='actions'>
                        <Button variant='outlined' color='secondary' onClick={onPlayerAttack}>
                            Attack
                        </Button>
                    </div>
                </div>

                <div className={style.loggerContainer}>
                    <TextField
                        id="logger"
                        label="Logger"
                        value={loggerValue}
                        multiline
                        rowsMax={20}
                    />
                </div>

                <Card className={style.card}>
                    <CardItem char={enemyData}/>
                </Card>
            </Grid>

        </Grid>
    );
};