import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PublicKey } from '@solana/web3.js';

import { TradeableAssetCardGrid } from './TradeableAssetCardGrid';
import { Numberu64 } from '@solana/spl-name-service';
import { tokenMapFixture } from '../../tests/fixtures';

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
  tokenInfos: [
    {
      ...tokenMapFixture['LLAMA'],
      amount: new Numberu64(1234),
      mint: new PublicKey('8123NJgPW37mPE8JigXxNBQbx4cUM8akgbydC1S1zWKR'),
      owner: new PublicKey('8123NJgPW37mPE8JigXxNBQbx4cUM8akgbydC1S1zWKR'),
      state: 'initialized',
      address: new PublicKey('8123NJgPW37mPE8JigXxNBQbx4cUM8akgbydC1S1zWKR'),
    },
    {
      ...tokenMapFixture['SOL'],
      amount: new Numberu64(1234),
      mint: new PublicKey('8123NJgPW37mPE8JigXxNBQbx4cUM8akgbydC1S1zWKR'),
      owner: new PublicKey('8123NJgPW37mPE8JigXxNBQbx4cUM8akgbydC1S1zWKR'),
      state: 'initialized',
      address: new PublicKey('8123NJgPW37mPE8JigXxNBQbx4cUM8akgbydC1S1zWKR'),
    },
  ],
};
