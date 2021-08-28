import React, { FC } from 'react';

import { Endpoint } from '../../contexts/connectionContext';
import { useWallet } from '../../hooks/useWallet';
import { useHistory } from 'react-router-dom';
import { Header } from './Header';
import { useConnection } from '../../hooks/useConnection';

export interface HeaderContainerProps {
  endpoints: Endpoint[];
}

export const HeaderContainer: FC<HeaderContainerProps> = ({ endpoints }) => {
  const { openWalletSelection, connected, disconnect } = useWallet();
  const { push } = useHistory();
  const { url, setUrl } = useConnection();
  return (
    <Header
      clusterUrl={url}
      setClusterUrl={setUrl}
      endpoints={endpoints}
      navigateTo={push}
      openWalletSelection={openWalletSelection}
      isWalletConnected={connected}
      disconnectWallet={disconnect}
    />
  );
};
