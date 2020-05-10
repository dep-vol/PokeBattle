//CORE
import React, {  useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//UI VENDOR
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//TYPES
import { Alert as AlertType } from 'init/types/store';
import { RootState } from 'init/store';
//BLL
import { actions } from 'init/rootActions';

export const Alert: React.FC = () => {

    const msg = useSelector<RootState, AlertType>(state => state.app.alert);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
        dispatch(actions.setMsg({ type: undefined, msg:''}));
    };

    useEffect(() => {
        if (msg.type) setOpen(true);
    },[msg.type]);

    if (!msg.type) return null;

    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <MuiAlert onClose={handleClose} severity={msg.type} variant='filled' >
                {msg.msg}
            </MuiAlert>
        </Snackbar>
    ); 
    
};
