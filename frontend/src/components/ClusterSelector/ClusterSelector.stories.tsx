import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ClusterSelector } from './ClusterSelector';
import { ENDPOINTS } from '../../config/connectionEndpoints';

export default {
  title: 'Components/ClusterSelector',
  component: ClusterSelector,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ClusterSelector>;

const Template: ComponentStory<typeof ClusterSelector> = (args) => (
  <ClusterSelector {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  endpoints: ENDPOINTS,
  clusterUrl: 'blah1',
};
