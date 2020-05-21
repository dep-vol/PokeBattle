//CORE
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//UI VENDORS
import { MuiThemeProvider } from '@material-ui/core/styles';
//ELEMS
import { Alert, Footer, Header, Welcome, Result } from 'elements';
//MODELS
import { CharsList } from 'models/Chars';
import { theme } from 'init/theme';
import { Battle } from '../Battle/components/Battle';

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
                            <Welcome />
                        </Route>
                        <Route path='/chars'>
                            <CharsList />
                        </Route>
                        <Route path='/battle'>
                            <Battle />
                        </Route>
                        <Route path='/result'>
                            <Result />
                        </Route>
                    </Switch>
                    <Footer/>
                </div>
            </MuiThemeProvider>
        </Router>
    );
};

