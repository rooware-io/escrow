import React, { FC } from 'react';
import { Button, IconButton } from '@material-ui/core';

import { Endpoint } from '../../contexts/connectionContext';
import { ClusterSelector } from '../ClusterSelector/ClusterSelector';
import { useWallet } from '../../hooks/useWallet';
import { useHistory } from 'react-router-dom';
import { routes } from '../../router/routes';
import { HomeOutlined } from '@material-ui/icons';

export interface HeaderProps {
  endpoints: Endpoint[];
}

export const Header: FC<HeaderProps> = ({ endpoints }) => {
  const { openWalletSelection, connected, disconnect } = useWallet();
  const { push } = useHistory();
  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="mode"
        onClick={() => push(routes.HOME)}
      >
        <HomeOutlined />
      </IconButton>
      {!connected ? (
        <Button
          variant="outlined"
          color="secondary"
          onClick={openWalletSelection}
        >
          Connect wallet
        </Button>
      ) : (
        <Button variant="outlined" color="secondary" onClick={disconnect}>
          Disconnect wallet
        </Button>
      )}
      <ClusterSelector endpoints={endpoints}></ClusterSelector>
    </>
  );
};
