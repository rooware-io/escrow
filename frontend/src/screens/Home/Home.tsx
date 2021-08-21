import { FC } from 'react';
import { IconButton, Button } from '@material-ui/core';
import { Brightness3, Brightness7 } from '@material-ui/icons';
import { useDarkMode } from '../../hooks/useDarkMode';

const Home: FC = () => {
  const [isDarkMode, setIsDarkMode] = useDarkMode();
  const icon = !isDarkMode ? <Brightness7 /> : <Brightness3 />;
  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="mode"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {icon}
      </IconButton>
      <Button variant="outlined" color="secondary">
        dwq
      </Button>
    </>
  );
};

export default Home;
