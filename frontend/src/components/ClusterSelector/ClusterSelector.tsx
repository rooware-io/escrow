import React, { FC } from 'react';

import { Endpoint } from '../../contexts/connectionContext';

export interface ClusterSelectorProps {
  endpoints: Endpoint[];
  clusterUrl: string;
  setClusterUrl: (val: string) => void;
}

const ClusterSelector: FC<ClusterSelectorProps> = ({
  endpoints,
  clusterUrl,
  setClusterUrl,
}) => {
  return (
    <select
      className="solBtnGray"
      value={clusterUrl}
      onChange={(e) => setClusterUrl(e.target.value)}
    >
      {endpoints.map(({ name, url }) => (
        <option value={url} key={url}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default ClusterSelector;
