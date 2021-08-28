import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CreateTradeDialog } from './CreateTradeDialog';
import { Button } from '@material-ui/core';
import { TokenInfo } from '@solana/spl-token-registry';

export default {
  title: 'Components/CreateTradeDialog',
  component: CreateTradeDialog,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CreateTradeDialog>;

const tokenMapFixture: { [address: string]: TokenInfo } = {
  EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: {
    chainId: 101,
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    tags: ['stablecoin'],
    extensions: {
      website: 'https://www.centre.io/',
      coingeckoId: 'usd-coin',
      serumV3Usdt: '77quYg4MGneUdjgXCunt9GgM1usmrxKY31twEy3WHwcS',
    },
  },
  '9nusLQeFKiocswDt6NQsiErm1M43H2b8x6v5onhivqKv': {
    chainId: 101,
    address: '9nusLQeFKiocswDt6NQsiErm1M43H2b8x6v5onhivqKv',
    symbol: 'LLAMA',
    name: 'SOLLAMA',
    decimals: 1,
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9nusLQeFKiocswDt6NQsiErm1M43H2b8x6v5onhivqKv/logo.png',
    tags: [],
    extensions: {
      website: 'https://sollama.finance',
      twitter: 'https://twitter.com/SollamaFinance',
    },
  },
};

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
Primary.args = {};
