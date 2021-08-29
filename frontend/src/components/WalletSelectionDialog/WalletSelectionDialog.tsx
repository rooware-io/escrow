import React, { FC } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core';

import { WalletProvider } from '../../contexts/walletContext';

export interface WalletSelectionDialogProps {
  walletProviders: WalletProvider[];
  isVisible: boolean;
  onSelectWallet: (walletProvider: WalletProvider) => () => void;
  onClose: () => void;
}

const WalletSelectionDialog: FC<WalletSelectionDialogProps> = ({
  walletProviders,
  isVisible,
  onSelectWallet,
  onClose,
}) => (
  <Dialog
    title="Select Wallet"
    open={isVisible}
    onClose={onClose}
    fullWidth={true}
  >
    <DialogContent>
      {walletProviders.map((provider) => (
        <div key={provider.name}>
          <Box m={1}>
            <Button
              size="large"
              onClick={onSelectWallet(provider)}
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
      ))}
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

export default WalletSelectionDialog;
