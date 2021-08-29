import React, { FC, useCallback, useState } from 'react';
import { Numberu64 } from '@solana/spl-name-service';
import { TokenInfo } from '@solana/spl-token-registry';

import { TokenInfoExtended } from '../TradeableAssetCard/TradeableAssetCard';

const NUMBER_REGEX = /^[0-9\b]+$/;

export interface TradeInputs {
  tokenSoldAmount: Numberu64;
  tokenBoughtMint: string;
  tokenBoughtAmount: Numberu64;
}

export interface CreateTradeFormProps {
  tokenSoldInfo: TokenInfoExtended;
  tokenMap: Map<string, TokenInfo>;
}

const CreateTradeForm: FC<CreateTradeFormProps> = ({
  tokenSoldInfo,
  tokenMap,
}) => {
  if (tokenMap.size === 0) {
    throw Error('No available mints found to trade against');
  }
  const [tradeInputs, setTradeInputs] = useState<TradeInputs>({
    tokenSoldAmount: new Numberu64(0),
    tokenBoughtAmount: new Numberu64(0),
    tokenBoughtMint: [...tokenMap.values()][0].address,
  });

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      window.alert(
        `Trading ${tradeInputs.tokenSoldAmount.toString()} ${
          tokenSoldInfo.symbol
        } for ${tradeInputs.tokenBoughtAmount.toString()} ${
          tokenMap.get(tradeInputs.tokenBoughtMint)!.symbol
        }`
      );
      event.preventDefault();
    },
    [tradeInputs]
  );

  const onSoldAmountChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value === '' || NUMBER_REGEX.test(value)) {
        setTradeInputs((currentTradeInputs) => ({
          ...currentTradeInputs,
          tokenSoldAmount: new Numberu64(value),
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
          tokenBoughtAmount: new Numberu64(value),
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
        tokenBoughtAmount: new Numberu64(0),
      }));
    },
    [setTradeInputs]
  );

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
      <input type="submit" value="Submit" />
    </form>
  );
};

export default CreateTradeForm;
