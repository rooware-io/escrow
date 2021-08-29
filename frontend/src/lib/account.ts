import {
  AccountInfo,
  Connection,
  ParsedAccountData,
  PublicKey,
} from '@solana/web3.js';
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
} from '@solana/spl-token';
import { TokenInfo } from '@solana/spl-token-registry';
import BN from 'bn.js';

import { AccountLayout } from './layout';

export interface TokenAccountInfo {
  address: PublicKey;
  owner: PublicKey;
  amount: BN;
  mint: PublicKey;
  state: string;
}

export const parseTokenAccountData = (
  address: PublicKey,
  account: AccountInfo<Buffer>
): TokenAccountInfo => {
  if (account.data.length !== AccountLayout.span) {
    throw Error(
      `Account buffer should be of size ${AccountLayout.span}. Received: ${account.data.length}`
    );
  }
  const decoded = AccountLayout.decode(account.data);
  return {
    address,
    mint: new PublicKey(decoded.mint),
    owner: new PublicKey(decoded.owner),
    amount: new BN(decoded.amount, 10, 'le'),
    state: decoded.state,
  };
};

export const getTokenAccountsInfo = async (
  connection: Connection,
  owner: PublicKey
) =>
  (
    await connection.getProgramAccounts(TOKEN_PROGRAM_ID, {
      filters: [
        {
          dataSize: 165,
        },
        { memcmp: { offset: 32, bytes: owner.toBase58() } },
      ],
    })
  )
    .map((accountInfo) =>
      parseTokenAccountData(accountInfo.pubkey, accountInfo.account)
    )
    .reduce(
      (accumulator, account) => ({
        ...accumulator,
        [account.address.toString()]: account,
      }),
      {}
    );

export const getAssociatedTokenAccountAddress = async (
  walletAddress: PublicKey,
  tokenMintAddress: PublicKey
): Promise<PublicKey> =>
  await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    tokenMintAddress,
    walletAddress
  );

export const isAssociatedTokenAccount = async (
  account: TokenAccountInfo,
  owner: PublicKey
) =>
  account.address ===
  (await getAssociatedTokenAccountAddress(owner, account.mint));

export const isKnownToken = (
  address: PublicKey,
  tokenMap: Map<string, TokenInfo>
) => tokenMap.has(address.toString());

export const getTokenAccountMint = async (
  connection: Connection,
  tokenAccountAddress: PublicKey
) =>
  ((await connection.getParsedAccountInfo(tokenAccountAddress, 'singleGossip'))
    .value!.data as ParsedAccountData).parsed.info.mint;
