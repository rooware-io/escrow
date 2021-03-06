import { useContext } from 'react';

import { ConnectionContext } from '../contexts/connectionContext';
import { getSolanaExplorerUrlSuffix } from '../lib/connection';

export function useConnection() {
  const context = useContext(ConnectionContext);
  return {
    ...context,
    solanaExplorerUrlSuffix: getSolanaExplorerUrlSuffix(context.url),
  };
}
