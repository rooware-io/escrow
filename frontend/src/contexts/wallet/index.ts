import React from 'react';
import { WalletAdapter } from './adapters';
import { WalletProvider } from './providers';

export const WalletContext = React.createContext<{
  walletAdapter: WalletAdapter | undefined;
  connected: boolean;
  openWalletSelection: () => void;
  walletProvider: WalletProvider | undefined; // TODO: Find something better than this we should be able to have a type of WalletAdapter here
}>({
  walletAdapter: undefined,
  connected: false,
  openWalletSelection() {},
  walletProvider: undefined,
});
