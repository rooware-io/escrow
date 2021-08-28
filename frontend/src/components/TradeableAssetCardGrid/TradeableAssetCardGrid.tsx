import React, { FC } from 'react';
import { Grid } from '@material-ui/core';

import {
  TokenInfoExtended,
  TradeableAssetCard,
} from '../TradeableAssetCard/TradeableAssetCard';

export interface TradeableAssetCardGridProps {
  tokenInfos: TokenInfoExtended[];
  onSelectAsset: (selectedToken: TokenInfoExtended) => void;
}

export const TradeableAssetCardGrid: FC<TradeableAssetCardGridProps> = ({
  tokenInfos,
  onSelectAsset,
}) => (
  <Grid>
    {tokenInfos.map((account) => (
      <TradeableAssetCard
        key={account.address.toString()}
        tokenInfo={account}
        onSelectAsset={onSelectAsset}
      />
    ))}
  </Grid>
);
