import { useContext } from 'react';
import { DarkModeContext } from '../contexts/darkMode';

export const useDarkMode = () => useContext(DarkModeContext);
