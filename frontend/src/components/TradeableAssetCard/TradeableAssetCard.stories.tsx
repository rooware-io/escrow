import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PublicKey } from '@solana/web3.js';

import { TradeableAssetCard } from './TradeableAssetCard';

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
  tokenAccountInfo: {
    amount: 1234,
    publicKey: new PublicKey('8123NJgPW37mPE8JigXxNBQbx4cUM8akgbydC1S1zWKR'),
    mint: new PublicKey('8123NJgPW37mPE8JigXxNBQbx4cUM8akgbydC1S1zWKR'),
  },
};
