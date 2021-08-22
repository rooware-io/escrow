import React from 'react';

import { AccountInfo } from '@solana/web3.js';

export interface Account {
  accountInfo: AccountInfo<Buffer> | null;
}

export const AccountContext = React.createContext<Account>({
  accountInfo: null,
});
