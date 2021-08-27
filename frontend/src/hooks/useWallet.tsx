import { useContext } from 'react';

import { WalletContext } from '../contexts/walletContext';

export const useWallet = () => {
  const {
    walletAdapter,
    connected,
    walletProvider,
    openWalletSelection,
  } = useContext(WalletContext);
  return {
    walletAdapter,
    connected,
    walletProvider,
    openWalletSelection,
    walletAddress: walletAdapter?.publicKey,
    connect: () => {
      walletAdapter ? walletAdapter.connect() : openWalletSelection();
    },
    disconnect: () => {
      walletAdapter?.disconnect();
    },
  };
};
