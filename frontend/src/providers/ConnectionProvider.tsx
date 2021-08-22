import { FC, useEffect, useMemo, useState } from 'react';

import { Connection } from '@solana/web3.js';

import { ConnectionContext } from '../contexts/connection';
import { DEFAULT_ENDPOINT, ENDPOINTS } from '../config/connectionEndpoints';
import { getItem, setItem } from '../utils/localStorage';

export const CONNECTION_URLS_KEY = 'connectionUrls';

export const ConnectionProvider: FC = ({ children }) => {
  const [url, setUrl] = useState(
    getItem(CONNECTION_URLS_KEY) || DEFAULT_ENDPOINT.url
  );
  useEffect(() => {
    setItem(CONNECTION_URLS_KEY, url);
  }, [url]);

  const connection = useMemo(() => new Connection(url, 'confirmed'), [url]);
  const endpoint = useMemo(
    () =>
      ENDPOINTS.find((endpoint) => endpoint.url === url) || DEFAULT_ENDPOINT,
    [url]
  );

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
};
