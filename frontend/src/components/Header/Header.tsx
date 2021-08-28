import React, { FC } from 'react';
import { Button, IconButton } from '@material-ui/core';

import { Endpoint, ExtendedCluster } from '../../contexts/connectionContext';
import { ClusterSelector } from '../ClusterSelector/ClusterSelector';
import { routes } from '../../router/routes';
import { HomeOutlined } from '@material-ui/icons';

export interface HeaderProps {
  clusterUrl: string;
  setClusterUrl: (val: string) => void;
  endpoints: Endpoint[];
  navigateTo: (route: string) => void;
  openWalletSelection: () => void;
  isWalletConnected: boolean;
  disconnectWallet: () => void;
}

export const Header: FC<HeaderProps> = ({
  clusterUrl,
  setClusterUrl,
  endpoints,
  disconnectWallet,
  isWalletConnected,
  navigateTo,
  openWalletSelection,
}) => (
  <>
    <IconButton
      edge="end"
      color="inherit"
      aria-label="mode"
      onClick={() => navigateTo(routes.HOME)}
    >
      <HomeOutlined />
    </IconButton>
    {!isWalletConnected ? (
      <Button
        variant="outlined"
        color="secondary"
        onClick={openWalletSelection}
      >
        Connect wallet
      </Button>
    ) : (
      <Button variant="outlined" color="secondary" onClick={disconnectWallet}>
        Disconnect wallet
      </Button>
    )}
    <ClusterSelector
      endpoints={endpoints}
      clusterUrl={clusterUrl}
      setClusterUrl={setClusterUrl}
    ></ClusterSelector>
  </>
);
