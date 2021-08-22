import React from 'react';
import { Connection } from '@solana/web3.js';
import { DEFAULT_ENDPOINT } from '../../config/endpoints';
import { ConnectionConfig } from './types';

export const ConnectionContext = React.createContext<ConnectionConfig>({
  cluster: DEFAULT_ENDPOINT.name,
  url: DEFAULT_ENDPOINT.url,
  setUrl: () => {},
  connection: new Connection(DEFAULT_ENDPOINT.url, 'confirmed'),
});
