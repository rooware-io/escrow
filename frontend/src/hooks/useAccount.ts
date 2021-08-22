import { useContext } from 'react';

import { AccountContext } from '../contexts/account';

export function useAccount() {
  const context = useContext(AccountContext);
  return context;
}
