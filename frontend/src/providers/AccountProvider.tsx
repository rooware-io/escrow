import React, { useEffect, useState } from 'react';

import { AccountInfo } from '@solana/web3.js';

import { AccountContext } from '../contexts/account';
import { useConnection } from '../hooks/useConnection';
import { useWallet } from '../hooks/useWallet';

export function AccountProvider({ children = null as any }) {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const [accountInfo, setAccountInfo] = useState<AccountInfo<Buffer> | null>(
    null
  );

  useEffect(() => {
    setAccountInfo(null);
    if (!publicKey) {
      return;
    }
    connection
      .getAccountInfo(publicKey)
      .then((newAccountInfo) => setAccountInfo(newAccountInfo));
    const subscriptionId = connection.onAccountChange(
      publicKey,
      (accountInfo) => {
        setAccountInfo(accountInfo);
      }
    );
    return () => {
      connection.removeAccountChangeListener(subscriptionId);
    };
  }, [connection, publicKey]);

  return (
    <AccountContext.Provider
      value={{
        accountInfo,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}
