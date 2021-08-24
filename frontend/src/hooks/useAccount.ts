import { useContext } from 'react';

import { AccountContext } from '../contexts/accountsContext';

export function useAccount() {
  const context = useContext(AccountContext);
  return context;
}
