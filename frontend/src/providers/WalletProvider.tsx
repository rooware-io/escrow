import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Wallet from '@project-serum/sol-wallet-adapter';
import { WalletDialog } from '../components/WalletDialog';
import { WALLET_PROVIDER_KEY } from '../constants';
import { WalletContext } from '../contexts/wallet';
import { useConnection } from '../hooks/useConnection';
import { useLocalStorageState } from '../hooks/useLocalStorage';
import { notify } from '../utils';
import { WALLET_PROVIDERS } from '../contexts/wallet/providers';
export function WalletProvider({ children = null as any }) {
  const { url } = useConnection();

  const [walletProviderUrl, setWalletProviderUrl] =
    useLocalStorageState(WALLET_PROVIDER_KEY);

  const walletProvider = useMemo(
    () =>
      WALLET_PROVIDERS.find(
        (walletProvider) => walletProvider.url === walletProviderUrl
      ),
    [walletProviderUrl]
  );

  const walletAdapter = useMemo(() => {
    if (walletProvider) {
      return walletProvider.adapter
        ? new walletProvider.adapter()
        : new Wallet(walletProviderUrl, url);
    }
  }, [walletProvider, walletProviderUrl, url]);

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (walletAdapter) {
      walletAdapter.on('connect', () => {
        if (walletAdapter.publicKey) {
          setConnected(true);
          const walletPublicKey = walletAdapter.publicKey.toBase58();
          const keyToDisplay =
            walletPublicKey.length > 20
              ? `${walletPublicKey.substring(
                  0,
                  7
                )}.....${walletPublicKey.substring(
                  walletPublicKey.length - 7,
                  walletPublicKey.length
                )}`
              : walletPublicKey;

          notify({
            message: 'Wallet update',
            description: 'Connected to wallet ' + keyToDisplay,
          });
        }
      });

      walletAdapter.on('disconnect', () => {
        setConnected(false);
        notify({
          message: 'Wallet update',
          description: 'Disconnected from wallet',
        });
      });
    }

    return () => {
      setConnected(false);
      if (walletAdapter) {
        walletAdapter.disconnect();
      }
    };
  }, [walletAdapter]);

  const [autoConnect, setAutoConnect] = useState(false);
  useEffect(() => {
    if (walletAdapter && autoConnect) {
      walletAdapter.connect();
      setAutoConnect(false);
    }

    return () => {};
  }, [walletAdapter, autoConnect]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const openWalletSelection = useCallback(() => setIsModalVisible(true), []);
  const closeWalletSelection = useCallback(() => setIsModalVisible(false), []);

  return (
    <WalletContext.Provider
      value={{
        walletAdapter,
        connected,
        openWalletSelection,
        walletProvider,
      }}
    >
      {children}
      <WalletDialog
        isVisible={isModalVisible}
        setWalletProviderUrl={setWalletProviderUrl}
        closeWalletSelection={closeWalletSelection}
        setAutoConnect={setAutoConnect}
      />
    </WalletContext.Provider>
  );
}
