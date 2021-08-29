import React from 'react';

import { ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import { darkTheme, lightTheme } from './assets/theme';
import { useDarkMode } from './hooks/useDarkMode';
import { ConnectionProvider } from './providers/ConnectionProvider';
import { WalletProvider } from './providers/WalletProvider';
import { Router } from './router/router';
import { AccountsProvider } from './providers/AccountsProvider';

const App = () => {
  const { isDarkModeEnabled } = useDarkMode();
  const appliedTheme = createTheme(isDarkModeEnabled ? darkTheme : lightTheme);
  return (
    <ThemeProvider theme={appliedTheme}>
      <BrowserRouter>
        <ConnectionProvider>
          <WalletProvider>
            <AccountsProvider>
              <Router />
            </AccountsProvider>
          </WalletProvider>
        </ConnectionProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
