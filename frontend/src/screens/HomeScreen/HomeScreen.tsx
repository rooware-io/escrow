import { FC } from 'react';

import { Button, Card } from '@material-ui/core';

import { useWallet } from '../../hooks/useWallet';
import { ENDPOINTS } from '../../config/connectionEndpoints';
import { useAccount } from '../../hooks/useAccount';
import { useHistory } from 'react-router-dom';
import { routes } from '../../router/routes';
import Header from '../../components/Header';

const HomeScreen: FC = () => {
  // const { isDarkModeEnabled, setIsDarkModeEnabled } = useDarkMode();
  const { connected } = useWallet();
  const { mainAccount } = useAccount();
  const { push } = useHistory();

  // const icon = !isDarkModeEnabled ? <Brightness7 /> : <Brightness3 />;
  return (
    <>
      <Header endpoints={ENDPOINTS} />
      {connected && mainAccount && (
        <>
          <Card style={{ marginBottom: 10 }}>
            Balance: {mainAccount.lamports || 0}
          </Card>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => push(routes.CREATE_TRADE)}
          >
            Create trade
          </Button>
        </>
      )}
    </>
  );
};

export default HomeScreen;
