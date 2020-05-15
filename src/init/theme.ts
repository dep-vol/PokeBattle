import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
    overrides: {
        MuiListItemText: {
            root: {
                flex: '0 1 auto'
            }
        }
    }
});