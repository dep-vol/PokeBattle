//CORE
import React, {useState, useEffect, useCallback} from 'react';
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
    const handleClose = useCallback(() => {
        setOpen(false);
        dispatch(actions.setMsg({ type: undefined, msg:''}));
    }, [dispatch]);

    useEffect(() => {
        if (msg.msg) setOpen(true);
    },[msg.msg]);

    if (!msg.type) return null;

    return (
        <Snackbar open={open} autoHideDuration={1500} onClose={handleClose} anchorOrigin={msg.anchor}>
            <MuiAlert onClose={handleClose} severity={msg.type} variant='filled' >
                {msg.msg}
            </MuiAlert>
        </Snackbar>
    ); 
    
};
