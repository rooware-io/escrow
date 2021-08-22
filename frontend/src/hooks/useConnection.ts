import { useContext } from 'react';
import { ConnectionContext } from '../contexts/connection';
import { getSolanaExplorerUrlSuffix } from '../lib/transaction';

export function useConnection() {
  const context = useContext(ConnectionContext);
  return {
    ...context,
    solanaExplorerUrlSuffix: getSolanaExplorerUrlSuffix(context.url),
  };
}
