import { Connection, PublicKey } from '@solana/web3.js';
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

export const findAssociatedTokenAddress = async (
  walletAddress: PublicKey,
  tokenMintAddress: PublicKey
): Promise<PublicKey> => {
  return (
    await PublicKey.findProgramAddress(
      [
        walletAddress.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        tokenMintAddress.toBuffer(),
      ],
      ASSOCIATED_TOKEN_PROGRAM_ID
    )
  )[0];
};

export interface TokenAccountInfo {
  publicKey: PublicKey;
  amount: number;
}

export const getTokenAccountBalance = async (
  connection: Connection,
  address: PublicKey
) => (await connection.getTokenAccountBalance(address)).value.uiAmount || 0;

export const getTokenAccountsInfo = async (
  connection: Connection,
  owner: PublicKey
) => {
  const accounts = await connection.getTokenAccountsByOwner(owner, {
    programId: TOKEN_PROGRAM_ID,
  });

  const accountsInfo = await Promise.all(
    accounts.value.map(async (account) => ({
      publicKey: account.pubkey,
      amount: await getTokenAccountBalance(connection, account.pubkey),
    }))
  );

  const accountsInfoMap = accountsInfo.reduce(
    (acc, account) => ({
      ...acc,
      [account.publicKey.toString()]: {
        publicKey: account.publicKey,
        amount: account.amount,
      },
    }),
    {}
  );
  return accountsInfoMap;
};
