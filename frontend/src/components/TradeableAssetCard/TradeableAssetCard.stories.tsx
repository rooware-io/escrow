import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';

import TradeableAssetCard from './TradeableAssetCard';
import { tokenMapFixture } from '../../tests/fixtures';

export default {
  title: 'Components/TradeableAssetCard',
  component: TradeableAssetCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof TradeableAssetCard>;

const Template: ComponentStory<typeof TradeableAssetCard> = (args) => (
  <TradeableAssetCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  tokenInfo: {
    ...tokenMapFixture['LLAMA'],
    amount: new BN(1234),
    mint: new PublicKey('8123NJgPW37mPE8JigXxNBQbx4cUM8akgbydC1S1zWKR'),
    owner: new PublicKey('8123NJgPW37mPE8JigXxNBQbx4cUM8akgbydC1S1zWKR'),
    state: 'initialized',
    address: new PublicKey('8123NJgPW37mPE8JigXxNBQbx4cUM8akgbydC1S1zWKR'),
  },
};
