import { PublicKey } from '@solana/web3.js';
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

// export const createAccount = async (
//   connection: Connection,
//   payer: Signer,
//   tokenMintAddress: PublicKey
// ) => {
//   const token = new Token(
//     connection,
//     tokenMintAddress,
//     TOKEN_PROGRAM_ID,
//     payer
//   );
// };
