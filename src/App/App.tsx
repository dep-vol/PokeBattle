//CORE
import React from 'react';
//UI VENDORS
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles/';
//ELEMS
import { Alert, Header } from 'elements';
//MODELS
import { CharacterChooser } from 'models/Chars';


const theme = createMuiTheme({
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


export const App: React.FC = () => {
    
    return (
        <MuiThemeProvider theme={theme}>
            <Alert />
            <Header />
            <CharacterChooser/>
        </MuiThemeProvider>

    );
};

