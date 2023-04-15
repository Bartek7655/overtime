import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App.jsx';
import {Provider} from "react-redux";
import store from "./redux/store";

if (module.hot) module.hot.accept();

const root = ReactDOM.createRoot(document.getElementById('app'))

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
