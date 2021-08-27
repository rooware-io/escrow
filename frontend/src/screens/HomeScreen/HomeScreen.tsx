import { FC } from 'react';

import { IconButton, Button, Card } from '@material-ui/core';
import { Brightness3, Brightness7 } from '@material-ui/icons';

import { useDarkMode } from '../../hooks/useDarkMode';
import { useWallet } from '../../hooks/useWallet';
import { ClusterSelector } from '../../components/ClusterSelector';
import { ENDPOINTS } from '../../config/connectionEndpoints';
import { useAccount } from '../../hooks/useAccount';
import { TradeableAssetCardGrid } from '../../components/TradeableAssetCardGrid/TradeableAssetCardGrid';
import { isAssociatedTokenAccount } from '../../lib/account';

const HomeScreen: FC = () => {
  const { isDarkModeEnabled, setIsDarkModeEnabled } = useDarkMode();
  const { openWalletSelection, connected, disconnect } = useWallet();
  const { mainAccount, tokenAccounts } = useAccount();

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
        <>
          <Card style={{ marginBottom: 10 }}>
            Balance: {mainAccount.lamports || 0}
          </Card>
          <TradeableAssetCardGrid
            tokenAccounts={Object.values(tokenAccounts).filter((account) =>
              isAssociatedTokenAccount(account, mainAccount.owner)
            )}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
