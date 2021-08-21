import React from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { dark, light } from './contexts/darkMode/theme';
import { useDarkMode } from './hooks/useDarkMode';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './screens/Home';
import { ConnectionProvider } from './providers/ConnectionProvider';
import { WalletProvider } from './providers/WalletProvider';

const App = () => {
  const [isDarkMode] = useDarkMode();
  const appliedTheme = createTheme(isDarkMode ? dark : light);
  return (
    <ThemeProvider theme={appliedTheme}>
      <ConnectionProvider>
        <WalletProvider>
          <Router>
            <Switch>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
  );
};

export default App;
