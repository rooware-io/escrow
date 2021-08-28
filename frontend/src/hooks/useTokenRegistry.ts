import { TokenInfo, TokenListProvider } from '@solana/spl-token-registry';
import { useEffect, useState } from 'react';
import { getClusterId } from '../lib/connection';
import { useConnection } from './useConnection';

export const useTokenRegistry = () => {
  const [tokenMap, setTokenMap] = useState<Map<string, TokenInfo>>(new Map());
  const { cluster } = useConnection();

  useEffect(() => {
    new TokenListProvider().resolve().then((tokens) => {
      const tokenList = tokens.filterByChainId(getClusterId(cluster)).getList();

      setTokenMap(
        tokenList.reduce((map, item) => {
          map.set(item.address, item);
          return map;
        }, new Map<string, TokenInfo>())
      );
    });
  }, [cluster, setTokenMap]);

  return {
    tokenMap,
  };
};
