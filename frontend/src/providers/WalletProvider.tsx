import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import Wallet from '@project-serum/sol-wallet-adapter';

import { WalletDialog } from '../components/WalletDialog';
import { WalletContext } from '../contexts/wallet';
import { useConnection } from '../hooks/useConnection';
import { notify } from '../utils/notify';
import { WALLET_PROVIDERS } from '../config/walletProviders';
import { getItem, setItem } from '../utils/localStorage';

export const WALLET_PROVIDER_KEY = 'walletProvider';

export const WalletProvider: FC = ({ children }) => {
  const { url } = useConnection();

  const [walletProviderUrl, setWalletProviderUrl] = useState(
    getItem(WALLET_PROVIDER_KEY)
  );
  useEffect(() => {
    setItem(WALLET_PROVIDER_KEY, walletProviderUrl);
  }, [walletProviderUrl]);

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
  const onWalletAdapterConnection = useCallback(() => {
    if (walletAdapter.publicKey) {
      setConnected(true);
      const walletPublicKey = walletAdapter.publicKey.toBase58();
      const keyToDisplay =
        walletPublicKey.length > 20
          ? `${walletPublicKey.substring(0, 7)}.....${walletPublicKey.substring(
              walletPublicKey.length - 7,
              walletPublicKey.length
            )}`
          : walletPublicKey;

      notify({
        message: 'Wallet update',
        description: 'Connected to wallet ' + keyToDisplay,
      });
    }
  }, [setConnected, walletAdapter]);
  const onWalletAdapterDisconnection = useCallback(() => {
    setConnected(false);
    notify({
      message: 'Wallet update',
      description: 'Disconnected from wallet',
    });
  }, [setConnected]);

  useEffect(() => {
    if (walletAdapter) {
      walletAdapter.on('connect', onWalletAdapterConnection);
      walletAdapter.on('disconnect', onWalletAdapterDisconnection);
    }
    return () => {
      if (walletAdapter) {
        walletAdapter.disconnect();
      }
      setConnected(false);
    };
  }, [walletAdapter, onWalletAdapterConnection, onWalletAdapterDisconnection]);

  const [autoConnect, setAutoConnect] = useState(false);
  useEffect(() => {
    if (walletAdapter && autoConnect) {
      walletAdapter.connect();
      setAutoConnect(false);
    }
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
};
