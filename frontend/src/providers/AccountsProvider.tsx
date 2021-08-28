import React, { useEffect, useState } from 'react';

import { AccountInfo } from '@solana/web3.js';

import { AccountContext, TokenAccountsMap } from '../contexts/accountsContext';
import { useConnection } from '../hooks/useConnection';
import { useWallet } from '../hooks/useWallet';
import { getTokenAccountsInfo, parseTokenAccountData } from '../lib/account';
import { useHistory } from 'react-router-dom';
import { routes } from '../router/routes';

export function AccountsProvider({ children = null as any }) {
  const { connection } = useConnection();
  const { walletAddress } = useWallet();
  const { push } = useHistory();

  const [mainAccount, setMainAccount] = useState<AccountInfo<Buffer> | null>(
    null
  );
  const [tokenAccounts, setTokenAccounts] = useState<TokenAccountsMap>({});

  useEffect(() => {
    setMainAccount(null);
    push(routes.HOME);
    if (!walletAddress) {
      return;
    }
    connection.getAccountInfo(walletAddress).then(setMainAccount);
    const mainAccountSubscriptionId = connection.onAccountChange(
      walletAddress,
      setMainAccount
    );
    getTokenAccountsInfo(connection, walletAddress).then(setTokenAccounts);
    return () => {
      connection.removeAccountChangeListener(mainAccountSubscriptionId);
    };
  }, [connection, walletAddress, push]);

  useEffect(() => {
    const tokenAccountSubscriptionIds = Object.values(tokenAccounts).map(
      (tokenAccount) =>
        connection.onAccountChange(
          tokenAccount.address,
          async (updatedRawAccountInfo) =>
            setTokenAccounts((currentTokenAccounts) => ({
              ...currentTokenAccounts,
              [tokenAccount.address.toString()]: parseTokenAccountData(
                tokenAccount.address,
                updatedRawAccountInfo
              ),
            }))
        )
    );
    return () => {
      tokenAccountSubscriptionIds.forEach((id) =>
        connection.removeAccountChangeListener(id)
      );
    };
  }, [connection, tokenAccounts]);

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
