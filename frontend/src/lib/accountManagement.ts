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

export interface ParsedTokenAccountData {
  isNative: boolean;
  mint: string;
  owner: string;
  state: string;
  tokenAmount: TokenAmount;
}

export const getTokenAccountBalance = async (
  connection: Connection,
  address: PublicKey
) => (await connection.getTokenAccountBalance(address)).value.uiAmount || 0;

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

  const accountsMap = accounts.reduce((acc, { account, pubkey }) => {
    const accountInfo = account.data.parsed.info as ParsedTokenAccountData;
    return {
      ...acc,
      [pubkey.toString()]: {
        publicKey: pubkey,
        amount: accountInfo.tokenAmount.amount,
      },
    };
  }, {});
  return accountsMap;
};
