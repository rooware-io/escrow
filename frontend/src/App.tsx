import React from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { dark, light } from './assets/theme';
import { useDarkMode } from './hooks/useDarkMode';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './screens/Home';

const App = () => {
  const [isDarkMode] = useDarkMode();
  const appliedTheme = createTheme(isDarkMode ? dark : light);
  return (
    <ThemeProvider theme={appliedTheme}>
      <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
