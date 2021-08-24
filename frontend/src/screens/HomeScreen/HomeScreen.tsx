import { FC } from 'react';

import { IconButton, Button, Card } from '@material-ui/core';
import { Brightness3, Brightness7 } from '@material-ui/icons';
// import { NATIVE_MINT } from '@solana/spl-token';

import { useDarkMode } from '../../hooks/useDarkMode';
import { useWallet } from '../../hooks/useWallet';
import { ClusterSelector } from '../../components/ClusterSelector';
import { ENDPOINTS } from '../../config/connectionEndpoints';
import { useAccount } from '../../hooks/useAccount';
import { TradeableAssetCard } from '../../components/TradeableAssetCard';
// import {
//   findAssociatedTokenAddress,
//   getTokenAccountsInfo,
// } from '../../lib/accountManagement';
// import { useConnection } from '../../hooks/useConnection';

const HomeScreen: FC = () => {
  const { isDarkModeEnabled, setIsDarkModeEnabled } = useDarkMode();
  const { openWalletSelection, connected, disconnect } = useWallet();
  const { mainAccount, tokenAccounts } = useAccount();

  // useEffect(() => {
  //   if (connected && publicKey) {
  //     findAssociatedTokenAddress(publicKey, NATIVE_MINT).catch((err) =>
  //       console.error(err)
  //     );
  //   }
  // }, [connected, publicKey]);
  const icon = !isDarkModeEnabled ? <Brightness7 /> : <Brightness3 />;
  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="mode"
        onClick={() => setIsDarkModeEnabled(!isDarkModeEnabled)}
      >
        {icon}
      </IconButton>
      {!connected ? (
        <Button
          variant="outlined"
          color="secondary"
          onClick={openWalletSelection}
        >
          Connect wallet
        </Button>
      ) : (
        <Button variant="outlined" color="secondary" onClick={disconnect}>
          Disconnect wallet
        </Button>
      )}
      <ClusterSelector endpoints={ENDPOINTS}></ClusterSelector>
      {connected && mainAccount && (
        <Card style={{ marginBottom: 10 }}>
          Balance: {mainAccount.lamports || 0}
        </Card>
      )}
      {Object.values(tokenAccounts).map((account) => (
        <TradeableAssetCard
          key={account.publicKey.toString()}
          tokenAccountInfo={account}
        />
      ))}
    </>
  );
};

export default HomeScreen;
