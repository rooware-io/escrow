import { clusterApiUrl } from '@solana/web3.js';
import { Endpoint } from '../contexts/connection/types';

export const ENDPOINTS: Endpoint[] = [
  {
    name: 'mainnet-beta',
    url: 'https://solstake.rpcpool.com',
  },
  {
    name: 'testnet',
    url: 'https://solstake.testnet.rpcpool.com',
  },
  {
    name: 'devnet',
    url: clusterApiUrl('devnet'),
  },
  {
    name: 'localnet',
    url: 'http://127.0.0.1:8899',
  },
];

export const DEFAULT_ENDPOINT = ENDPOINTS[0];
