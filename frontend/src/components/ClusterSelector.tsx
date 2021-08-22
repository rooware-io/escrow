import React, { FC } from 'react';
import { Endpoint } from '../contexts/connection';
import { useConnection } from '../hooks/useConnection';

export interface ClusterSelectorProps {
  endpoints: Endpoint[];
}

export const ClusterSelector: FC<ClusterSelectorProps> = ({ endpoints }) => {
  const { url, setUrl } = useConnection();

  return (
    <select
      className="solBtnGray"
      value={url}
      onChange={(e) => setUrl(e.target.value as string)}
    >
      {endpoints.map(({ name, url }) => (
        <option value={url} key={url}>
          {name}
        </option>
      ))}
    </select>
  );
};
