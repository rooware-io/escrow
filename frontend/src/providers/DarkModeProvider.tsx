import React, { useEffect, useState } from 'react';
import { DARK_MODE_KEY } from '../constants';
import { DarkModeContext } from '../contexts/darkMode';
import { useLocalStorageState } from '../hooks/useLocalStorage';

export const DarkModeProvider: React.FC = ({ children }) => {
  const [isDarkModeEnabledRaw, setIsDarkModeEnabledRaw] = useLocalStorageState(
    DARK_MODE_KEY,
    undefined
  );
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(
    isDarkModeEnabledRaw === 'true'
  );

  useEffect(() => {
    setIsDarkModeEnabledRaw(isDarkModeEnabled ? 'true' : 'false');
  }, [isDarkModeEnabled, setIsDarkModeEnabledRaw]);

  return (
    <DarkModeContext.Provider
      value={{
        isDarkModeEnabled,
        setIsDarkModeEnabled,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};
