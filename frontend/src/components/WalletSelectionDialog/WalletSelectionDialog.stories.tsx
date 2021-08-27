import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { WalletSelectionDialog } from './WalletSelectionDialog';
import { ASSETS_URL } from '../../config/walletProviders';
import { Button } from '@material-ui/core';
import { WalletProvider } from '../../contexts/walletContext';

export default {
  title: 'Components/WalletSelectionDialog',
  component: WalletSelectionDialog,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof WalletSelectionDialog>;

const Template: ComponentStory<typeof WalletSelectionDialog> = (args) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <WalletSelectionDialog
        {...args}
        isVisible={open}
        onSelectWallet={(walletProvider: WalletProvider) => () =>
          window.alert(`Selected ${walletProvider.name}`)}
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
  walletProviders: [
    {
      name: 'Sollet 1',
      url: 'https://www.sollet.io',
      icon: `${ASSETS_URL}sollet.svg`,
    },
    {
      name: 'Sollet 2',
      url: 'https://www.sollet.io',
      icon: `${ASSETS_URL}sollet.svg`,
    },
  ],
};
