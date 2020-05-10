//CORE
import React from 'react';
//UI VENDORS
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';
//TYPES
import { Char } from 'api/types';
//ELEMS
import { Loader } from 'elements/';

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
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },
}));

type Props = {
    isLoading: boolean;
    chars: Char[];
    offset: number;
    requestLimit: number;
    onFetchChars: (offset: number) => void;
}

export const CharsList: React.FC<Props> = ({ isLoading, chars, requestLimit, offset, onFetchChars}) => {

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
            <div className={style.buttonContainer}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onFetchChars(offset)}
                    disabled={isLoading ||offset > requestLimit}
                >
                    SHOW MORE
                </Button>
            </div>
        </div>

    );
};
