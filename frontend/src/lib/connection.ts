import { ENV } from '@solana/spl-token-registry';
import {
  clusterApiUrl,
  Connection,
  Signer,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import { ExtendedCluster } from '../contexts/connectionContext';

import { WalletAdapter } from '../contexts/walletContext';

export async function sendTransaction(
  connection: Connection,
  wallet: WalletAdapter,
  instructions: TransactionInstruction[],
  signers?: Signer[]
) {
  if (!wallet?.publicKey) {
    throw new Error('Wallet is not connected');
  }

  let transaction = new Transaction({ feePayer: wallet.publicKey });
  transaction.add(...instructions);
  transaction.recentBlockhash = (
    await connection.getRecentBlockhash('finalized')
  ).blockhash;
  if (signers && signers.length > 0) {
    transaction.partialSign(...signers);
  }
  transaction = await wallet.signTransaction(transaction);
  const rawTransaction = transaction.serialize();
  let options = {
    skipPreflight: true, // implications?
    commitment: 'processed',
  };

  const txid = await connection.sendRawTransaction(rawTransaction, options);
  return txid;
}

export function getSolanaExplorerUrlSuffix(endpointUrl: string) {
  if (endpointUrl === clusterApiUrl('devnet')) {
    return '?cluster=devnet';
  } else if (endpointUrl === clusterApiUrl('testnet')) {
    return '?cluster=testnet';
  }
  return '';
}

export function getClusterId(cluster: ExtendedCluster) {
  switch (cluster) {
    case 'mainnet-beta':
      return ENV.MainnetBeta;
    case 'testnet':
      return ENV.Testnet;
    default:
      return ENV.Devnet;
  }
}
