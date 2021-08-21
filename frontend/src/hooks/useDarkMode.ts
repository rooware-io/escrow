import { Dispatch, SetStateAction, useContext } from 'react';
import { DarkModeContext } from '../contexts/darkMode';

export const useDarkMode = (): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const { isDarkModeEnabled, setIsDarkModeEnabled } =
    useContext(DarkModeContext);
  return [isDarkModeEnabled, setIsDarkModeEnabled];
};
