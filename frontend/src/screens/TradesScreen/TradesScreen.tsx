import { FC } from 'react';
import Header from '../../components/Header';
import { ENDPOINTS } from '../../config/connectionEndpoints';

const TradesScreen: FC = () => {
  return (
    <>
      <Header endpoints={ENDPOINTS} />
    </>
  );
};

export default TradesScreen;
