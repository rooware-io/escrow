import { AccountLayout, Token, TOKEN_PROGRAM_ID, u64 } from '@solana/spl-token';
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  TransactionInstruction,
} from '@solana/web3.js';
import BN from 'bn.js';

import { WalletAdapter } from '../../contexts/walletContext';
import { getTokenAccountMint } from '../account';
import { sendTransaction } from '../connection';
import { EscrowLayout, ESCROW_ACCOUNT_DATA_LAYOUT } from '../layout';

export const initEscrow = async (
  connection: Connection,
  wallet: WalletAdapter,
  initializerAccountAddress: PublicKey,
  initializerXTokenAccountAddress: PublicKey,
  amountXTokensToSendToEscrow: u64,
  initializerReceivingTokenAccountPubkey: PublicKey,
  expectedAmount: u64,
  escrowProgramId: PublicKey
) => {
  const XTokenMintAccountAddress = new PublicKey(
    await getTokenAccountMint(connection, initializerXTokenAccountAddress)
  );
  const minimumBalanceForRentExemption = await connection.getMinimumBalanceForRentExemption(
    AccountLayout.span,
    'singleGossip'
  );
  // console.log({
  //   aliceAccount: initializerAccountAddress.toString(),
  //   assetSoldAccountAddress: initializerXTokenAccountAddress.toString(),
  //   assetSoldMint: XTokenMintAccountAddress.toString(),
  //   assetSoldAmount: amountXTokensToSendToEscrow.toString(),
  //   assetBoughtAccountAddress: initializerReceivingTokenAccountPubkey.toString(),
  //   assetBoughtAmount: expectedAmount.toString(),
  //   programId: escrowProgramId.toString(),
  // });
  const tempTokenAccountKeypair = new Keypair();
  const createTempTokenAccountIx = SystemProgram.createAccount({
    programId: TOKEN_PROGRAM_ID,
    space: AccountLayout.span,
    lamports: minimumBalanceForRentExemption,
    fromPubkey: initializerAccountAddress,
    newAccountPubkey: tempTokenAccountKeypair.publicKey,
  });
  const initTempAccountIx = Token.createInitAccountInstruction(
    TOKEN_PROGRAM_ID,
    XTokenMintAccountAddress,
    tempTokenAccountKeypair.publicKey,
    initializerAccountAddress
  );

  const transferXTokensToTempAccountIx = Token.createTransferInstruction(
    TOKEN_PROGRAM_ID,
    initializerXTokenAccountAddress,
    tempTokenAccountKeypair.publicKey,
    initializerAccountAddress,
    [],
    amountXTokensToSendToEscrow
  );

  const escrowAccountKeypair = new Keypair();
  const createEscrowAccountIx = SystemProgram.createAccount({
    space: ESCROW_ACCOUNT_DATA_LAYOUT.span,
    lamports: minimumBalanceForRentExemption,
    fromPubkey: initializerAccountAddress,
    newAccountPubkey: escrowAccountKeypair.publicKey,
    programId: escrowProgramId,
  });

  const initEscrowIx = new TransactionInstruction({
    programId: escrowProgramId,
    keys: [
      {
        pubkey: initializerAccountAddress,
        isSigner: true,
        isWritable: false,
      },
      {
        pubkey: tempTokenAccountKeypair.publicKey,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: initializerReceivingTokenAccountPubkey,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: escrowAccountKeypair.publicKey,
        isSigner: false,
        isWritable: true,
      },
      { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    ],
    data: expectedAmount.toBuffer(),
    // data: Buffer.from(Uint8Array.of(0, ...expectedAmount.toArray('le', 8))),
  });

  const instructions = [
    createTempTokenAccountIx,
    initTempAccountIx,
    transferXTokensToTempAccountIx,
    createEscrowAccountIx,
    // initEscrowIx,
  ];

  sendTransaction(connection, wallet, instructions, [
    tempTokenAccountKeypair,
    escrowAccountKeypair,
  ]);
  await new Promise((resolve) => setTimeout(resolve, 5000));

  let encodedEscrowState;
  const encodedEscrowStateRes = await connection.getAccountInfo(
    escrowAccountKeypair.publicKey
  );
  encodedEscrowState = encodedEscrowStateRes!.data;

  const decodedEscrowState = ESCROW_ACCOUNT_DATA_LAYOUT.decode(
    encodedEscrowState
  ) as EscrowLayout;

  return {
    escrowAccountPubkey: escrowAccountKeypair.publicKey.toBase58(),
    isInitialized: !!decodedEscrowState.isInitialized,
    initializerAccountAddress: new PublicKey(
      decodedEscrowState.initializerPubkey
    ).toBase58(),
    XTokenTempAccountPubkey: new PublicKey(
      decodedEscrowState.initializerTempTokenAccountPubkey
    ).toBase58(),
    initializerYTokenAccount: new PublicKey(
      decodedEscrowState.initializerReceivingTokenAccountPubkey
    ).toBase58(),
    expectedAmount: new BN(
      decodedEscrowState.expectedAmount,
      10,
      'le'
    ).toNumber(),
  };
};
