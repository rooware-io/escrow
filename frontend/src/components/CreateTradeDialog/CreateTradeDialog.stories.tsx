import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '@material-ui/core';
import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';

import CreateTradeDialog from './CreateTradeDialog';
import { tokenMapFixture } from '../../tests/fixtures';

export default {
  title: 'Components/CreateTradeDialog',
  component: CreateTradeDialog,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CreateTradeDialog>;

const Template: ComponentStory<typeof CreateTradeDialog> = (args) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CreateTradeDialog
        {...args}
        isVisible={open}
        onClose={() => setOpen(false)}
      />
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open
      </Button>
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  tokenMap: new Map(Object.entries(tokenMapFixture)),
  tokenSoldInfo: {
    ...tokenMapFixture['SOL'],
    amount: new BN(1234),
    mint: new PublicKey('8123NJgPW37mPE8JigXxNBQbx4cUM8akgbydC1S1zWKR'),
    owner: new PublicKey('8123NJgPW37mPE8JigXxNBQbx4cUM8akgbydC1S1zWKR'),
    state: 'initialized',
    address: new PublicKey('8123NJgPW37mPE8JigXxNBQbx4cUM8akgbydC1S1zWKR'),
  },
};
