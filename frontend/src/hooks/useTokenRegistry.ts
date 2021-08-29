import { TokenInfo } from '@solana/spl-token-registry';
import { useEffect, useState } from 'react';
import { tokenMapFixture } from '../tests/fixtures';

export const useTokenRegistry = () => {
  const [tokenMap, setTokenMap] = useState<Map<string, TokenInfo>>(new Map());

  useEffect(() => {
    // new TokenListProvider().resolve().then((tokens) => {
    //   const tokenList = tokens.filterByChainId(getClusterId(cluster)).getList();

    //   setTokenMap(
    //     tokenList.reduce((map, item) => {
    //       map.set(item.address, item);
    //       return map;
    //     }, new Map<string, TokenInfo>())
    //   );
    // });
    setTokenMap(new Map(Object.entries(tokenMapFixture)));
  }, [setTokenMap]);

  return {
    tokenMap,
  };
};
