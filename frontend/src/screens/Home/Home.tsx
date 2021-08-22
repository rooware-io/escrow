import { FC } from 'react';

import { IconButton, Button } from '@material-ui/core';
import { Brightness3, Brightness7 } from '@material-ui/icons';

import { useDarkMode } from '../../hooks/useDarkMode';
import { useWallet } from '../../hooks/useWallet';
import { ClusterSelector } from '../../components/ClusterSelector';
import { ENDPOINTS } from '../../config/connectionEndpoints';

const Home: FC = () => {
  const { isDarkModeEnabled, setIsDarkModeEnabled } = useDarkMode();
  const { openWalletSelection } = useWallet();
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
      <Button
        variant="outlined"
        color="secondary"
        onClick={openWalletSelection}
      >
        Connect wallet
      </Button>
      <ClusterSelector endpoints={ENDPOINTS}></ClusterSelector>
    </>
  );
};

export default Home;
