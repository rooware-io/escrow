import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';

import TradeableAssetCardGrid from './TradeableAssetCardGrid';
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
      ...tokenMapFixture['C5NBj4qaiDXqpwnuonnQTGDA9RfXdJt4yzAp2EwSaLD9'],
      amount: new BN(1234),
      mint: new PublicKey('C5NBj4qaiDXqpwnuonnQTGDA9RfXdJt4yzAp2EwSaLD9'),
      owner: new PublicKey('8123NJgPW37mPE8JigXxNBQbx4cUM8akgbydC1S1zWKR'),
      state: 'initialized',
      address: new PublicKey(1234),
    },
    {
      ...tokenMapFixture['DbUxiH9TAeSqSC1vKzwPhu9G6YVo6qjhu2haW2thVA4L'],
      amount: new BN(1234),
      mint: new PublicKey('DbUxiH9TAeSqSC1vKzwPhu9G6YVo6qjhu2haW2thVA4L'),
      owner: new PublicKey('8123NJgPW37mPE8JigXxNBQbx4cUM8akgbydC1S1zWKR'),
      state: 'initialized',
      address: new PublicKey(4321),
    },
  ],
};
