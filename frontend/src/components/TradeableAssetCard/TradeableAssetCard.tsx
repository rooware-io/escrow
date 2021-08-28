import React, { FC } from 'react';
import { Button, Card } from '@material-ui/core';

import { TokenAccountInfo } from '../../lib/account';
import { TokenInfo } from '@solana/spl-token-registry';

// export type TokenInfoExtended = TokenInfo & TokenAccountInfo;
export type TokenInfoExtended = Omit<TokenInfo, 'address'> & TokenAccountInfo;

export interface TradeableAssetCardProps {
  tokenInfo: TokenInfoExtended;
  onSelectAsset: (selectedToken: TokenInfoExtended) => void;
}

export const TradeableAssetCard: FC<TradeableAssetCardProps> = ({
  tokenInfo,
  onSelectAsset,
}) => (
  <Card style={{ backgroundColor: '#AAA', marginBottom: '5px' }}>
    <div>Account: {tokenInfo.address.toString()}</div>
    <div>
      Token: {tokenInfo.name} ({tokenInfo.symbol})
    </div>
    <div>Amount: {tokenInfo.amount.toString()}</div>

    <Button
      color="secondary"
      variant="contained"
      onClick={() => onSelectAsset(tokenInfo)}
    >
      Create trade
    </Button>
  </Card>
);
