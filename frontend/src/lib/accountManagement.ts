import {
  AccountInfo,
  Connection,
  ParsedAccountData,
  PublicKey,
  TokenAmount,
} from '@solana/web3.js';
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
} from '@solana/spl-token';

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

export interface TokenAccountInfo {
  publicKey: PublicKey;
  amount: number;
  mint: PublicKey;
}

export interface ParsedTokenAccountData {
  isNative: boolean;
  mint: string;
  owner: string;
  state: string;
  tokenAmount: TokenAmount;
}

export const parseAccount = (
  account: AccountInfo<ParsedAccountData>,
  address: PublicKey
) => {
  const accountInfo = account.data.parsed.info as ParsedTokenAccountData;
  return {
    publicKey: address,
    amount: accountInfo.tokenAmount.amount,
    mint: new PublicKey(accountInfo.mint),
  };
};

export const getTokenAccountsInfo = async (
  connection: Connection,
  owner: PublicKey
) => {
  const accounts = (await connection.getParsedProgramAccounts(
    TOKEN_PROGRAM_ID,
    {
      filters: [
        {
          dataSize: 165, // obviously...
        },
        { memcmp: { offset: 32, bytes: owner.toBase58() } }, // obviously...
      ],
    }
  )) as {
    pubkey: PublicKey;
    account: AccountInfo<ParsedAccountData>;
  }[];
  accounts.forEach((account) => {
    console.log(account);
  });

  const accountsMap = accounts.reduce(
    (accumulator, { account, pubkey }) => ({
      ...accumulator,
      [account.owner.toString()]: parseAccount(account, pubkey),
    }),
    {}
  );
  return accountsMap;
};

export const isAssociatedTokenAccount = async (
  account: TokenAccountInfo,
  owner: PublicKey
) =>
  account.publicKey ===
  (await getAssociatedTokenAccountAddress(owner, account.mint));
