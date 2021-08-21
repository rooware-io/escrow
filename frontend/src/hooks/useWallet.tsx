import { useContext } from 'react';
import { WalletContext } from '../contexts/wallet';

export const useWallet = () => {
  const { walletAdapter, connected, walletProvider, openWalletSelection } =
    useContext(WalletContext);
  return {
    walletAdapter,
    connected,
    walletProvider,
    openWalletSelection,
    publicKey: walletAdapter?.publicKey,
    connect: () => {
      walletAdapter ? walletAdapter.connect() : openWalletSelection();
    },
    disconnect: () => {
      walletAdapter?.disconnect();
    },
  };
};
