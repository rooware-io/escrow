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
