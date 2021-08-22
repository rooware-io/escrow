import React, { useEffect, useState } from 'react';

import { DarkModeContext } from '../contexts/darkMode';
import { getItem, setItem } from '../utils/localStorage';

export const DARK_MODE_KEY = 'darkMode';

export const DarkModeProvider: React.FC = ({ children }) => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(
    getItem(DARK_MODE_KEY) === 'true'
  );
  useEffect(() => {
    setItem(DARK_MODE_KEY, isDarkModeEnabled ? 'true' : 'false');
  }, [isDarkModeEnabled]);

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
