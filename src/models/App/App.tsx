//CORE
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//UI VENDORS
import { MuiThemeProvider } from '@material-ui/core/styles';
//ELEMS
import { Alert, Footer, Header, Welcome } from 'elements';
//MODELS
import { CharsList } from 'models/Chars';
import { theme } from 'init/theme';

const style: React.CSSProperties= {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
};

export const App: React.FC = () => {

    return (
        <Router>
            <MuiThemeProvider theme={theme}>
                <Alert/>
                <div style={style}>
                    <Header/>
                    <Switch>
                        <Route path='/' exact>
                            <Welcome/>
                        </Route>
                        <Route path='/chars'>
                            <CharsList/>
                        </Route>
                    </Switch>
                    <Footer/>
                </div>
            </MuiThemeProvider>
        </Router>
    );
};

