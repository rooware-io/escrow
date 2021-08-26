import React, { FC } from 'react';
import { Grid } from '@material-ui/core';

import { TokenAccountInfo } from '../../lib/accountManagement';
import { TradeableAssetCard } from '../TradeableAssetCard/TradeableAssetCard';

export interface TradeableAssetCardGridProps {
  tokenAccounts: TokenAccountInfo[];
}

export const TradeableAssetCardGrid: FC<TradeableAssetCardGridProps> = ({
  tokenAccounts,
}) => (
  <Grid>
    {tokenAccounts.map((account) => (
      <TradeableAssetCard
        key={account.publicKey.toString()}
        tokenAccountInfo={account}
      />
    ))}
  </Grid>
);
