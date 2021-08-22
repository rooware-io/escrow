import React from 'react';
import EventEmitter from 'eventemitter3';
import { PublicKey, Transaction } from '@solana/web3.js';

export interface WalletAdapter extends EventEmitter {
  publicKey: PublicKey | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  connect: () => any;
  disconnect: () => any;
}

export interface WalletProvider {
  name: string;
  url: string;
  icon: string;
  adapter?: any;
}

export const WalletContext = React.createContext<{
  walletAdapter?: WalletAdapter;
  connected: boolean;
  openWalletSelection: () => void;
  walletProvider?: WalletProvider; // TODO: Find something better than this we should be able to have a type of WalletAdapter here
}>({
  walletAdapter: undefined,
  connected: false,
  openWalletSelection() {},
  walletProvider: undefined,
});
