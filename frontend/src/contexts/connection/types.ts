import { Cluster, Connection } from '@solana/web3.js';

export type ExtendedCluster = Cluster | 'localnet';

export interface Endpoint {
  name: ExtendedCluster;
  url: string;
}

export interface ConnectionConfig {
  cluster: ExtendedCluster;
  url: string;
  setUrl: (val: string) => void;
  connection: Connection;
  sendConnection: Connection;
}
