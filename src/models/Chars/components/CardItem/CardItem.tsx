//CORE
import React from 'react';
//UI VENDOR
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';
//TYPES
import { Char } from 'init/types/store';



const useStyles = makeStyles((theme) => ({
    avatar: {
        border: '1px solid white',
        width: '70px',
        height: '70px'
    },
    listItem: {
        justifyContent: 'space-between',
        borderBottom: `1px solid ${theme.palette.primary.light}`
    },
    hp: {
        justifyContent: 'space-between',
        borderBottom: `1px solid ${theme.palette.primary.light}`,
    }
})
);

type Props = {
    char: Char;
}

const CardItemEl: React.FC<Props> = ({char}) => {
    const style = useStyles();

    return (
        <>
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
                            <ListItem
                                style={stat.name === 'hp'
                                    ? {
                                        background: `linear-gradient(90deg, #f44336 ${char.countHP*100}%, rgba(0,0,0,0.12) 0%)`
                                    }
                                    : {}
                                }
                                className={style.listItem}
                                key={stat.name + i}
                            >
                                <ListItemText primary={stat.name}/>
                                <ListItemText secondary={stat.base}/>
                            </ListItem>
                        );
                    })}
                </List>
            </CardContent>

        </>
    );
};

export const CardItem = React.memo(CardItemEl);