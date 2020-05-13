import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Char } from '../../../../api/types';
import Card from '@material-ui/core/Card/Card';


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
        margin: '0 10px 20px'
    },
    avatar: {
        border: '1px solid white',
        width: '70px',
        height: '70px'
    },
    listItem: {
        justifyContent: 'space-between',
        borderBottom: `1px solid ${theme.palette.primary.light}`
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

type Props = {
    char: Char;
    onInit: (name: string) => () => void;
    isLoading: boolean;
}

export const CardItem: React.FC<Props> = ({char, onInit, isLoading}) => {
    const style = useStyles();

    return (
        <Card className={style.card}>
            <CardHeader
                avatar={
                    <Avatar src={char.sprites} variant='rounded' className={style.avatar}/>
                }
                title={char.name}
                titleTypographyProps={{variant: 'h5'}}
            />
            <CardContent>
                <List>
                    {char.stats.map((stat, i) => {
                        return (
                            <ListItem className={style.listItem} key={stat.name + i}>
                                <ListItemText primary={stat.name}/>
                                <ListItemText secondary={stat.base}/>
                            </ListItem>
                        );
                    })}
                </List>
                <div className={style.paging}>
                    <Button variant='contained' onClick={onInit(char.name)} disabled={isLoading}>
                        Choose
                    </Button>
                </div>
            </CardContent>

        </Card>
    );
};
