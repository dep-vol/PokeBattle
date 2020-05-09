import React from 'react';
import { Header, CharacterChooser } from './components';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles/';
import { Alert } from './components';


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


const App: React.FC = () => {
    
    return (
        <MuiThemeProvider theme={theme}>
            <Alert />
            <Header />
            <CharacterChooser/>
        </MuiThemeProvider>

    );
};

export default App;
