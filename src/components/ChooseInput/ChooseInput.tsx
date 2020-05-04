import React from 'react';
import { FormControl, InputLabel, NativeSelect, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        textAlign: 'center',
        padding: '20px'
    },
    select: {
        width: '200px'
    }
});

const ChooseInput: React.FC = () => {
    const style = useStyles();
    
    return (
        <div className={style.container}>
            <FormControl>
                <InputLabel htmlFor="character">Choose you pokemon:</InputLabel>
                <NativeSelect
                    defaultValue=''
                    inputProps={{
                        name: 'character select',
                        id: 'character',
                        className: style.select
                    }}
                >
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                </NativeSelect>
            </FormControl>

        </div>

    );
};

export default ChooseInput;