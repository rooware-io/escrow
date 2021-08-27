import React from 'react';
import { AccountInfo } from '@solana/web3.js';

import { TokenAccountInfo } from '../lib/account';

export interface TokenAccountsMap {
  [publicKey: string]: TokenAccountInfo;
}

export interface Account {
  mainAccount: AccountInfo<Buffer> | null;
  tokenAccounts: TokenAccountsMap;
}

export const AccountContext = React.createContext<Account>({
  mainAccount: null,
  tokenAccounts: {},
});
