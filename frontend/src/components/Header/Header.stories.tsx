import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Header } from './Header';
import { ENDPOINTS } from '../../config/connectionEndpoints';

export default {
  title: 'Components/Header',
  component: Header,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  clusterUrl: 'blah1',
  endpoints: ENDPOINTS,
  isWalletConnected: true,
  navigateTo: (route: string) => window.alert(`navigating to ${route}`),
  disconnectWallet: () => {},
};
