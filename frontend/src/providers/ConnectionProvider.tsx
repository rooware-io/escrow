import { Connection } from '@solana/web3.js';
import { useMemo } from 'react';
import { CONNECTION_URLS_KEY } from '../constants';
import { ConnectionContext } from '../contexts/connection';
import { ENDPOINTS } from '../config/endpoints';
import { useLocalStorageState } from '../hooks/useLocalStorage';

export function ConnectionProvider({ children = undefined as any }) {
  const [url, setUrl] = useLocalStorageState(
    CONNECTION_URLS_KEY,
    ENDPOINTS[0].url
  );

  const connection = useMemo(() => new Connection(url, 'confirmed'), [url]);

  const endpoint = ENDPOINTS.find((end) => end.url === url) || ENDPOINTS[0];

  return (
    <ConnectionContext.Provider
      value={{
        cluster: endpoint.name,
        url,
        setUrl,
        connection,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}
