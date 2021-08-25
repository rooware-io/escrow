import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TradeableAssetCard } from './TradeableAssetCard';
import { PublicKey } from '@solana/web3.js';

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
  tokenAccountInfo: { amount: 1234, publicKey: new PublicKey('4321') },
};
