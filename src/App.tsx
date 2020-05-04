import React from 'react';
import { Header, CharacterChooser } from './components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});


const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Header />
            <CharacterChooser/>
        </ThemeProvider>

    );
};

export default App;
