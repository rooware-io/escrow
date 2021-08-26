import React, { useEffect, useState } from 'react';

import { AccountInfo } from '@solana/web3.js';

import { AccountContext, TokenAccountsMap } from '../contexts/accountsContext';
import { useConnection } from '../hooks/useConnection';
import { useWallet } from '../hooks/useWallet';
import { getTokenAccountsInfo } from '../lib/accountManagement';

export function AccountsProvider({ children = null as any }) {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const [mainAccount, setMainAccount] = useState<AccountInfo<Buffer> | null>(
    null
  );
  const [tokenAccounts, setTokenAccounts] = useState<TokenAccountsMap>({});

  useEffect(() => {
    setMainAccount(null);
    if (!publicKey) {
      return;
    }
    connection.getAccountInfo(publicKey).then(setMainAccount);
    const subscriptionId = connection.onAccountChange(
      publicKey,
      setMainAccount
    );
    getTokenAccountsInfo(connection, publicKey).then(setTokenAccounts);
    // const tokenSubscriptionIds = Object.values(tokenAccounts).map(
    //   ({ publicKey }) =>
    //     connection.onAccountChange(publicKey, async (account) =>
    //       setTokenAccounts({
    //         ...tokenAccounts,
    //         [publicKey.toString()]: {
    //           publicKey: new PublicKey(1234),
    //           amount: 0,
    //         }, //parseAccount(account),
    //       })
    //     )
    // );
    return () => {
      connection.removeAccountChangeListener(subscriptionId);
      // tokenSubscriptionIds.forEach((id) =>
      //   connection.removeAccountChangeListener(id)
      // );
    };
  }, [connection, publicKey]);

  return (
    <AccountContext.Provider
      value={{
        mainAccount,
        tokenAccounts,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}
