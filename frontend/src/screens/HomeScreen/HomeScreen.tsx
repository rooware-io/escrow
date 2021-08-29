import { FC } from 'react';
import { Card } from '@material-ui/core';

import { useWallet } from '../../hooks/useWallet';
import { ENDPOINTS } from '../../config/connectionEndpoints';
import { useAccount } from '../../hooks/useAccount';
import Header from '../../components/Header';

const HomeScreen: FC = () => {
  const { connected } = useWallet();
  const { mainAccount } = useAccount();

  return (
    <>
      <Header endpoints={ENDPOINTS} />
      {connected && mainAccount && (
        <>
          <Card style={{ marginBottom: 10 }}>
            Balance: {mainAccount.lamports || 0}
          </Card>
        </>
      )}
    </>
  );
};

export default HomeScreen;
