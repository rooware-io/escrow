import React, { FC } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import { WALLET_PROVIDERS } from '../config/walletProviders';

export interface WalletDialogProps {
  isVisible: boolean;
  setWalletProviderUrl: (url: string) => void;
  closeWalletSelection: () => void;
  setAutoConnect: (state: boolean) => void;
}

export const WalletDialog: FC<WalletDialogProps> = ({
  isVisible,
  setWalletProviderUrl,
  closeWalletSelection,
  setAutoConnect,
}) => {
  const selectWalletFactory = (providerUrl: string) => () => {
    setWalletProviderUrl(providerUrl);
    setAutoConnect(true);
    closeWalletSelection();
  };

  return (
    <Dialog
      title="Select Wallet"
      open={isVisible}
      onClose={closeWalletSelection}
      fullWidth={true}
    >
      <DialogContent>
        {WALLET_PROVIDERS.map((provider) => {
          const onClick = selectWalletFactory(provider.url);

          return (
            <div key={provider.name}>
              <Box m={1}>
                <Button
                  size="large"
                  onClick={onClick}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    width: '100%',
                    textAlign: 'left',
                  }}
                  variant="contained"
                >
                  <img
                    alt={`${provider.name}`}
                    width={40}
                    height={40}
                    src={provider.icon}
                    style={{ marginRight: 20 }}
                  />
                  {provider.name}
                </Button>
              </Box>
            </div>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeWalletSelection} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
