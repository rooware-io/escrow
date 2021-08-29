import React, { FC, useCallback, useState } from 'react';
import { TokenInfo } from '@solana/spl-token-registry';
import { PublicKey } from '@solana/web3.js';
import { u64 } from '@solana/spl-token';

import { TokenInfoExtended } from '../TradeableAssetCard/TradeableAssetCard';
import { useWallet } from '../../hooks/useWallet';
import { initEscrow } from '../../lib/actions/initEscrow';
import { useConnection } from '../../hooks/useConnection';

const NUMBER_REGEX = /^[0-9\b]+$/;
const ESCROW_PROGRAM_ID = new PublicKey(
  '7NLR788dkxXtfnUsFx7CRxr12E3zDpsCUn5qB6JWNE9c'
);

export interface TradeInputs {
  tokenSoldAmount: u64;
  tokenBoughtMint: string;
  tokenBoughtAccountAddress: string;
  tokenBoughtAmount: u64;
}

export interface CreateTradeFormProps {
  tokenSoldInfo: TokenInfoExtended;
  tokenMap: Map<string, TokenInfo>;
}

const CreateTradeForm: FC<CreateTradeFormProps> = ({
  tokenSoldInfo,
  tokenMap,
}) => {
  if (tokenMap.size === 0)
    throw Error('No available mints found to trade against');

  const { connection } = useConnection();
  const { walletAdapter } = useWallet();

  if (!walletAdapter || !walletAdapter.publicKey)
    throw Error('Wallet not connected');

  const [tradeInputs, setTradeInputs] = useState<TradeInputs>({
    tokenSoldAmount: new u64(0),
    tokenBoughtAmount: new u64(0),
    tokenBoughtAccountAddress: '',
    tokenBoughtMint: [...tokenMap.values()][0].address,
  });

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      try {
        const destinationAccountPubkey = new PublicKey(
          tradeInputs.tokenBoughtAccountAddress
        );
        window.alert(
          `Trading ${tradeInputs.tokenSoldAmount.toString()} ${
            tokenSoldInfo.symbol
          } for ${tradeInputs.tokenBoughtAmount.toString()} ${
            tokenMap.get(tradeInputs.tokenBoughtMint)!.symbol
          }`
        );
        if (!walletAdapter.publicKey) throw Error('Wallet not connected');

        initEscrow(
          connection,
          walletAdapter,
          walletAdapter.publicKey,
          tokenSoldInfo.address,
          tradeInputs.tokenSoldAmount,
          destinationAccountPubkey,
          tradeInputs.tokenBoughtAmount,
          ESCROW_PROGRAM_ID
        ).then((res) => console.log(res));
      } catch (e: any) {
        console.error(e);
      }
      event.preventDefault();
    },
    [
      connection,
      tradeInputs,
      tokenMap,
      tokenSoldInfo.symbol,
      tokenSoldInfo.address,
      walletAdapter,
    ]
  );

  const onSoldAmountChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value === '' || NUMBER_REGEX.test(value)) {
        setTradeInputs((currentTradeInputs) => ({
          ...currentTradeInputs,
          tokenSoldAmount: new u64(value),
        }));
      }
    },
    [setTradeInputs]
  );

  const onBoughtAmountChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value === '' || NUMBER_REGEX.test(value)) {
        setTradeInputs((currentTradeInputs) => ({
          ...currentTradeInputs,
          tokenBoughtAmount: new u64(value),
        }));
      }
    },
    [setTradeInputs]
  );

  const onBoughtMintChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      setTradeInputs((currentTradeInputs) => ({
        ...currentTradeInputs,
        tokenBoughtMint: value,
        tokenBoughtAmount: new u64(0),
      }));
    },
    [setTradeInputs]
  );

  const onBoughtMintAccountAddressChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setTradeInputs((currentTradeInputs) => ({
        ...currentTradeInputs,
        tokenBoughtAccountAddress: value,
      }));
    },
    [setTradeInputs]
  );

  const isValidInput = tradeInputs.tokenSoldAmount.gt(new u64(0));

  return (
    <form onSubmit={onSubmit}>
      <label>
        Trade:{' '}
        <div>
          <input
            type="text"
            value={tradeInputs.tokenSoldAmount.toString()}
            onChange={onSoldAmountChange}
          />{' '}
          {tokenSoldInfo.symbol}
          <img
            alt={tokenSoldInfo.symbol}
            src={tokenSoldInfo.logoURI}
            style={{ height: '30px', width: '30px' }}
          />
        </div>
      </label>
      <label>
        For:
        <input
          type="text"
          value={tradeInputs.tokenBoughtAmount.toString()}
          onChange={onBoughtAmountChange}
        />
      </label>
      <label>
        <select
          value={tradeInputs.tokenBoughtMint}
          onChange={onBoughtMintChange}
        >
          {[...tokenMap.values()].map(({ address, name }) => (
            <option key={address} value={address}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <img
        alt={tradeInputs.tokenBoughtMint}
        src={tokenMap.get(tradeInputs.tokenBoughtMint)!.logoURI}
        style={{ height: '30px', width: '30px' }}
      />
      {tradeInputs.tokenBoughtMint && (
        <label>
          Destination account for{' '}
          {tokenMap.get(tradeInputs.tokenBoughtMint)!.symbol}
          <input
            type="text"
            value={tradeInputs.tokenBoughtAccountAddress}
            onChange={onBoughtMintAccountAddressChange}
          />
        </label>
      )}
      <input disabled={!isValidInput} type="submit" value="Submit" />
    </form>
  );
};

export default CreateTradeForm;
