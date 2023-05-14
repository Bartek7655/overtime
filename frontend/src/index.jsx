import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import store from "./redux/store";
import {BrowserRouter} from "react-router-dom";
import Routers from "./components/routers/Routers.jsx";

if (module.hot) module.hot.accept();

const root = ReactDOM.createRoot(document.getElementById('app'))

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routers/>
        </BrowserRouter>
    </Provider>
);
