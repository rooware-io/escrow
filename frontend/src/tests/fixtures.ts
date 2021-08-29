import { TokenInfo } from '@solana/spl-token-registry';

export const tokenMapFixture: { [symbol: string]: TokenInfo } = {
  C5NBj4qaiDXqpwnuonnQTGDA9RfXdJt4yzAp2EwSaLD9: {
    chainId: 101,
    address: 'C5NBj4qaiDXqpwnuonnQTGDA9RfXdJt4yzAp2EwSaLD9',
    symbol: 'TOX',
    name: 'Token X',
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
  DbUxiH9TAeSqSC1vKzwPhu9G6YVo6qjhu2haW2thVA4L: {
    chainId: 101,
    address: 'DbUxiH9TAeSqSC1vKzwPhu9G6YVo6qjhu2haW2thVA4L',
    symbol: 'TOY',
    name: 'Token Y',
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
