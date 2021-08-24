import { WalletProvider } from '../contexts/walletContext';

const ASSETS_URL =
  'https://raw.githubusercontent.com/solana-labs/oyster/main/assets/wallets/';

export const WALLET_PROVIDERS: WalletProvider[] = [
  {
    name: 'Sollet',
    url: 'https://www.sollet.io',
    icon: `${ASSETS_URL}sollet.svg`,
  },
];
