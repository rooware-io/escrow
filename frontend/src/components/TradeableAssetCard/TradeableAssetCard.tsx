import React, { FC } from 'react';
import { Card } from '@material-ui/core';

import { TokenAccountInfo } from '../../lib/account';

export interface TradeableAssetCardProps {
  tokenAccountInfo: TokenAccountInfo;
}

export const TradeableAssetCard: FC<TradeableAssetCardProps> = ({
  tokenAccountInfo,
}) => (
  <Card>
    Account: {tokenAccountInfo.address.toString()} - Amount:{' '}
    {tokenAccountInfo.amount.toString()}
  </Card>
);
