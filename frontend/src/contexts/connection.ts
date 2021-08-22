import React from 'react';

import { Cluster, Connection } from '@solana/web3.js';

import { DEFAULT_ENDPOINT } from '../config/connectionEndpoints';

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
}

export const ConnectionContext = React.createContext<ConnectionConfig>({
  cluster: DEFAULT_ENDPOINT.name,
  url: DEFAULT_ENDPOINT.url,
  setUrl: () => {},
  connection: new Connection(DEFAULT_ENDPOINT.url, 'confirmed'),
});
