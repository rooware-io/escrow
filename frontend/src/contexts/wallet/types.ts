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
