import { TokenInfo } from '@solana/spl-token-registry';

export const tokenMapFixture: { [symbol: string]: TokenInfo } = {
  EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: {
    chainId: 101,
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    tags: ['stablecoin'],
    extensions: {
      website: 'https://www.centre.io/',
      coingeckoId: 'usd-coin',
      serumV3Usdt: '77quYg4MGneUdjgXCunt9GgM1usmrxKY31twEy3WHwcS',
    },
  },
  '9pQKy9V21TzY8xPS7MJB1vLfhvooGe6gmZxeV34qrPwB': {
    chainId: 101,
    address: '9pQKy9V21TzY8xPS7MJB1vLfhvooGe6gmZxeV34qrPwB',
    symbol: 'TOX',
    name: 'TOKENX',
    decimals: 1,
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9nusLQeFKiocswDt6NQsiErm1M43H2b8x6v5onhivqKv/logo.png',
    tags: [],
    extensions: {
      website: 'https://sollama.finance',
      twitter: 'https://twitter.com/SollamaFinance',
    },
  },
  '9nusLQeFKiocswDt6NQsiErm1M43H2b8x6v5onhivqKv': {
    chainId: 101,
    address: '9nusLQeFKiocswDt6NQsiErm1M43H2b8x6v5onhivqKv',
    symbol: 'LLAMA',
    name: 'SOLLAMA',
    decimals: 1,
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9nusLQeFKiocswDt6NQsiErm1M43H2b8x6v5onhivqKv/logo.png',
    tags: [],
    extensions: {
      website: 'https://sollama.finance',
      twitter: 'https://twitter.com/SollamaFinance',
    },
  },
};
