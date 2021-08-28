import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Numberu64 } from '@solana/spl-name-service';
import { PublicKey } from '@solana/web3.js';

import { CreateTradeForm } from './CreateTradeForm';
import { tokenMapFixture } from '../../tests/fixtures';

export default {
  title: 'Components/CreateTradeForm',
  component: CreateTradeForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CreateTradeForm>;

const Template: ComponentStory<typeof CreateTradeForm> = (args) => (
  <CreateTradeForm {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  tokenMap: new Map(Object.entries(tokenMapFixture)),
  tokenSoldInfo: {
    ...tokenMapFixture['LLAMA'],
    amount: new Numberu64(1234),
    mint: new PublicKey('8123NJgPW37mPE8JigXxNBQbx4cUM8akgbydC1S1zWKR'),
    owner: new PublicKey('8123NJgPW37mPE8JigXxNBQbx4cUM8akgbydC1S1zWKR'),
    state: 'initialized',
    address: new PublicKey('8123NJgPW37mPE8JigXxNBQbx4cUM8akgbydC1S1zWKR'),
  },
};
