import { useContext } from 'react';

import { DarkModeContext } from '../contexts/darkModeContext';

export const useDarkMode = () => useContext(DarkModeContext);
