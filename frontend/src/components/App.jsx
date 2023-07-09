import React from 'react';
import AppBarOvertime from "./main/AppBarOvertime.jsx";
import {ThemeProvider} from "@mui/material/styles";

import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    background: {
      default: '#79786B',
    },
  },
});

export function App() {
  return (
      <ThemeProvider theme={theme}>
          <AppBarOvertime/>
      </ThemeProvider>
  );
}

export default App
