import React, {  useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { Alert as AlertType } from '../../types/store';
import { actions } from '../../redux/actions/rootActions';

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
