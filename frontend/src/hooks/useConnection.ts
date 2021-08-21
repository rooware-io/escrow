import {
  Connection,
  Transaction,
  TransactionInstruction,
  Signer,
  clusterApiUrl,
} from '@solana/web3.js';
import { useContext } from 'react';
import { ConnectionContext } from '../contexts/connection';
import { WalletAdapter } from '../contexts/wallet/adapters';

export function useConnection() {
  return useContext(ConnectionContext);
}

export async function sendTransaction(
  connection: Connection,
  wallet: WalletAdapter,
  instructions: TransactionInstruction[],
  signers: Signer[]
) {
  if (!wallet?.publicKey) {
    throw new Error('Wallet is not connected');
  }

  let transaction = new Transaction({ feePayer: wallet.publicKey });
  transaction.add(...instructions);
  transaction.recentBlockhash = (
    await connection.getRecentBlockhash('finalized')
  ).blockhash;
  if (signers.length > 0) {
    transaction.partialSign(...signers);
  }
  transaction = await wallet.signTransaction(transaction);
  const rawTransaction = transaction.serialize();
  let options = {
    skipPreflight: true,
    commitment: 'processed',
  };

  const txid = await connection.sendRawTransaction(rawTransaction, options);
  return txid;
}

export function useSolanaExplorerUrlSuffix() {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error('Missing connection context');
  }
  const endpoint = context.url;
  if (endpoint === clusterApiUrl('devnet')) {
    return '?cluster=devnet';
  } else if (endpoint === clusterApiUrl('testnet')) {
    return '?cluster=testnet';
  }
  return '';
}
