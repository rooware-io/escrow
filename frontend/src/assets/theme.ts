import { ThemeOptions } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { grey } from '@material-ui/core/colors';

export const light: ThemeOptions = {
  palette: {
    background: { paper: grey[500] },
    primary: {
      main: green[500],
    },
    secondary: {
      main: purple[500],
    },
  },
};
export const dark = {
  palette: {
    background: { paper: grey[100] },
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
};
