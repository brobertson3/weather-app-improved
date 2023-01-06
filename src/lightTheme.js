import * as React from 'react';
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#1ecbe1',
    },
    secondary: {
      main: '#38ca35'
    },
    warning: {
      main: '#ebb514'
    },
  },
  typography: {
    fontFamily: 'Roboto',
    htmlFontSize: '16',
  },
});

lightTheme.typography.h3 = {
  fontSize: '1.7rem',
  '@media (min-width:768px)': {
    fontSize: '2.4rem',
  },
};

export default lightTheme;