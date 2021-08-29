import { createTheme } from '@material-ui/core/styles';
import { red, grey, purple, yellow } from '@material-ui/core/colors';

export const lightTheme = createTheme({
  palette: {
    background: { paper: red[500] },
    primary: {
      main: red[500],
    },
    secondary: {
      main: purple[500],
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    background: { paper: grey[100] },
    primary: {
      main: purple[500],
    },
    secondary: {
      main: yellow[500],
    },
  },
});
