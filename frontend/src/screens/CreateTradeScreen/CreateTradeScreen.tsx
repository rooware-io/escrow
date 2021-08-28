import { FC, useCallback, useState } from 'react';

import { useAccount } from '../../hooks/useAccount';
import { useTokenRegistry } from '../../hooks/useTokenRegistry';
import { CreateTradeDialog } from '../../components/CreateTradeDialog/CreateTradeDialog';
import { TokenInfoExtended } from '../../components/TradeableAssetCard/TradeableAssetCard';
import { TradeableAssetCardGrid } from '../../components/TradeableAssetCardGrid/TradeableAssetCardGrid';
import { ENDPOINTS } from '../../config/connectionEndpoints';
import { Header } from '../../components/Header/Header';

const CreateTradeScreen: FC = () => {
  const { mainAccount, tokenAccounts } = useAccount();
  const { tokenMap } = useTokenRegistry();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [
    selectedTokenInfo,
    setSelectedTokenInfo,
  ] = useState<TokenInfoExtended | null>(null);

  const onClose = useCallback(() => {
    setSelectedTokenInfo(null);
    setIsModalVisible(false);
  }, [setIsModalVisible, setSelectedTokenInfo]);

  const onSelectAsset = useCallback(
    (asset: TokenInfoExtended) => {
      setSelectedTokenInfo(asset);
      setIsModalVisible(true);
    },
    [setIsModalVisible, setSelectedTokenInfo]
  );

  if (!mainAccount) return null;

  const tokenInfos = Object.values(tokenAccounts)
    // .filter(
    //   (account) => isAssociatedTokenAccount(account, mainAccount.owner) && isKnownToken(account.mint, tokenMap)
    // )
    .map(
      ({ address, owner, state, amount, mint }): TokenInfoExtended => ({
        ...(tokenMap.get(address.toString()) || {
          chainId: 103,
          decimals: 9,
          name: 'dummy',
          symbol: 'DMY',
        }), // TODO: Remove when able to get some funded accounts on devnet
        owner,
        state,
        amount,
        mint,
        address,
      })
    );

  return (
    <>
      <Header endpoints={ENDPOINTS} />
      <TradeableAssetCardGrid
        tokenInfos={tokenInfos}
        onSelectAsset={onSelectAsset}
      />
      {selectedTokenInfo && (
        <CreateTradeDialog
          isVisible={isModalVisible}
          onClose={onClose}
          tokenSoldInfo={selectedTokenInfo}
          tokenMap={tokenMap}
        />
      )}
    </>
  );
};

export default CreateTradeScreen;
