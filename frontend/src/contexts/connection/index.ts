import React from 'react';
import { Connection } from '@solana/web3.js';
import { DEFAULT_ENDPOINTS, ENDPOINTS } from './endpoints';
import { ConnectionConfig } from './types';

export const ConnectionContext = React.createContext<ConnectionConfig>({
  cluster: ENDPOINTS[0].name,
  url: DEFAULT_ENDPOINTS,
  setUrl: () => {},
  connection: new Connection(DEFAULT_ENDPOINTS, 'confirmed'),
  sendConnection: new Connection(DEFAULT_ENDPOINTS, 'confirmed'),
});
