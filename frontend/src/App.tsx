import React from 'react';

import './App.css';
import { ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { dark, light } from './assets/theme';
import { useDarkMode } from './hooks/useDarkMode';
import { ConnectionProvider } from './providers/ConnectionProvider';
import { WalletProvider } from './providers/WalletProvider';
import { Router } from './router/router';

const App = () => {
  const { isDarkModeEnabled } = useDarkMode();
  const appliedTheme = createTheme(isDarkModeEnabled ? dark : light);
  return (
    <ThemeProvider theme={appliedTheme}>
      <ConnectionProvider>
        <WalletProvider>
          <Router />
        </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
  );
};

export default App;
