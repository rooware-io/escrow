import React, { FC } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import { TokenInfo } from '@solana/spl-token-registry';
import { CreateTradeForm } from '../CreateTradeForm/CreateTradeForm';
import { TokenInfoExtended } from '../TradeableAssetCard/TradeableAssetCard';

export interface CreateTradeDialogProps {
  isVisible: boolean;
  onClose: () => void;
  tokenSoldInfo: TokenInfoExtended;
  tokenMap: Map<string, TokenInfo>;
}

export const CreateTradeDialog: FC<CreateTradeDialogProps> = ({
  isVisible,
  onClose,
  tokenSoldInfo,
  tokenMap,
}) => {
  return (
    <Dialog
      title="Create trade"
      open={isVisible}
      onClose={onClose}
      fullWidth={true}
    >
      <DialogContent>
        <CreateTradeForm tokenMap={tokenMap} tokenSoldInfo={tokenSoldInfo} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
