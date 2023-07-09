import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import store from "./redux/store";
import {BrowserRouter} from "react-router-dom";
import Routers from "./components/routers/Routers.jsx";
import App from "./components/App.jsx";
import {ThemeProvider} from "@mui/material/styles";

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#79786B',
    },
  },
});
if (module.hot) module.hot.accept();

const root = ReactDOM.createRoot(document.getElementById('app'))

root.render(
        <Provider store={store}>
            <BrowserRouter>
                    <ThemeProvider theme={theme}>
                <App/>
                    </ThemeProvider>
                <Routers/>
            </BrowserRouter>
        </Provider>
);
