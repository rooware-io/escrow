import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PublicKey } from '@solana/web3.js';

import { TradeableAssetCardGrid } from './TradeableAssetCardGrid';
import { Numberu64 } from '@solana/spl-name-service';

export default {
  title: 'Components/TradeableAssetCardGrid',
  component: TradeableAssetCardGrid,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof TradeableAssetCardGrid>;

const Template: ComponentStory<typeof TradeableAssetCardGrid> = (args) => (
  <TradeableAssetCardGrid {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  tokenAccounts: [
    {
      amount: new Numberu64(1234),
      address: new PublicKey('8123NJgPW37mPE8JigXxNBQbx4cUM8akgbydC1S1zWKR'),
      mint: new PublicKey('8123NJgPW37mPE8JigXxNBQbx4cUM8akgbydC1S1zWKR'),
      owner: new PublicKey('8123NJgPW37mPE8JigXxNBQbx4cUM8akgbydC1S1zWKR'),
      state: 'initialized',
    },
    {
      amount: new Numberu64(9876543),
      address: new PublicKey('8123NJgPW37mPE8JigXxNBQbx4cUM8akgbydC1S1zWKR'),
      mint: new PublicKey('HUYV5CuPV6ifmfHb9nvg37RMJmfzjojp1LUcmTrYNcGV'),
      owner: new PublicKey('8123NJgPW37mPE8JigXxNBQbx4cUM8akgbydC1S1zWKR'),
      state: 'initialized',
    },
  ],
};
