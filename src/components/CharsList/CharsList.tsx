import React from 'react';
import { Avatar, Card, CardContent, CardHeader, List, ListItem, ListItemText } from '@material-ui/core';
import Loader from '../Loader/Loader';
import { makeStyles } from '@material-ui/core/styles';
import { Char } from '../../types/api';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '20px'
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
    }
}));

type Props = {
    isLoading: boolean;
    chars: Char[];
}

const CharsList: React.FC<Props> = ({ isLoading, chars}) => {

    const style = useStyles();

    const CharsNodes = chars.map((char, i) => {
        return <Card key={i+Math.random()} className={style.card}>
            <CardHeader
                avatar={
                    <Avatar src={char.sprites} variant='rounded' className={style.avatar} />
                }
                title={char.name}
                titleTypographyProps={{variant:'h5'}}
            />
            <CardContent>
                <List>
                    {char.stats.map((stat, i) => {
                        return <ListItem className={style.listItem} key={stat.base+i+Math.random()}>
                            <ListItemText primary={stat.name}/>
                            <ListItemText secondary={stat.base}/>
                        </ListItem>;
                    })}
                </List>
            </CardContent>

        </Card>;
    });

    return (
        <div>
            <div className={style.root}>
                {CharsNodes}
            </div>
            <div>
                {isLoading ? <Loader/> : null}
            </div>
        </div>

    );
};

export default  CharsList;