import React, { Dispatch, SetStateAction } from 'react';

export const DarkModeContext = React.createContext({
  isDarkModeEnabled: false,
  setIsDarkModeEnabled: (() => {}) as Dispatch<SetStateAction<boolean>>,
});
