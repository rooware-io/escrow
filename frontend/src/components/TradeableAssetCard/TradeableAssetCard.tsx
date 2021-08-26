import React, { FC } from 'react';
import { Card } from '@material-ui/core';

import { TokenAccountInfo } from '../../lib/accountManagement';

export interface TradeableAssetCardProps {
  tokenAccountInfo: TokenAccountInfo;
}

export const TradeableAssetCard: FC<TradeableAssetCardProps> = ({
  tokenAccountInfo,
}) => (
  <Card>
    Account: {tokenAccountInfo.publicKey.toString()} - Amount:{' '}
    {tokenAccountInfo.amount}
  </Card>
);
