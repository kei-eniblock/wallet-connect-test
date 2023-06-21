import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import CheckComponent from "./components/CheckComponent/CheckComponent";
import {Eniblock, UnsafeStorage} from "@eniblock/sdk";

export const sdk = new Eniblock({
    authConfig: {
        clientId: process.env.AUTH_CLIENT_ID!,
        redirectUrl: process.env.AUTH_REDIRECT_URI!,
    },
    tssConfig: {
        kmsUrl: "https://sdk.eniblock.com",
        wasmPath: "wasm/eniblock.wasm",
        kmsVerify: true,
    },
    storageItems: [{alias: "LocalStorage", storage: new UnsafeStorage()}],
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/check",
        element: <CheckComponent/>,
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
