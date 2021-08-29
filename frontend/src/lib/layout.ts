import { struct, blob, u8, u32 } from '@solana/buffer-layout';

export const publicKey = (property: string = 'publicKey') => blob(32, property);

export const uint64 = (property: string = 'uint64') => blob(8, property);

export const AccountLayout = struct([
  publicKey('mint'),
  publicKey('owner'),
  uint64('amount'),
  u32('delegateOption'),
  publicKey('delegate'),
  u8('state'),
  u32('isNativeOption'),
  uint64('isNative'),
  uint64('delegatedAmount'),
  u32('closeAuthorityOption'),
  publicKey('closeAuthority'),
]);

export interface EscrowLayout {
  isInitialized: number;
  initializerPubkey: Uint8Array;
  initializerReceivingTokenAccountPubkey: Uint8Array;
  initializerTempTokenAccountPubkey: Uint8Array;
  expectedAmount: Uint8Array;
}

export const ESCROW_ACCOUNT_DATA_LAYOUT = struct([
  u8('isInitialized'),
  publicKey('initializerPubkey'),
  publicKey('initializerTempTokenAccountPubkey'),
  publicKey('initializerReceivingTokenAccountPubkey'),
  uint64('expectedAmount'),
]);
