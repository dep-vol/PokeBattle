import React from 'react';
import {ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

type Props = {
    defeatedEnemyLog: {
        enemy: string;
        log: string;
    };
}

const useStyles = makeStyles({
    logContainer: {
        whiteSpace: 'break-spaces'
    }
});

export const ExpansionList: React.FC<Props> = ({defeatedEnemyLog}) => {

    const style = useStyles();

    return (
        <div>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon='>'
                >
                    <Typography>{`Defeated ${defeatedEnemyLog.enemy} log:`}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography component='div' className={style.logContainer}>
                        {defeatedEnemyLog.log}
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
};