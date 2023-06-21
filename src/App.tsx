import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import authService from "./services/auth-service";
import {Eniblock, UnsafeStorage} from "@eniblock/sdk";

function App(): React.JSX.Element {
    const [publicKey, setPublicKey] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const sdk = new Eniblock({
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

    const handleLoginClick = () => {
        setTimeout(() => console.log('Log in progress'), 2000);
        authService.login().then(() => {
            console.log('Logged in');
        }).catch((error) => {
            console.error('Login error: ', error);
        })
    }

    useEffect(() => {
        sdk.wallet.instantiate().then(wallet => {
            wallet.account.instantiate('My first account').then(account => {
                account.getPublicKey().then(publicKey => {
                    setPublicKey(publicKey);
                }).catch(error => console.error(error));
                account.getAddress().then(address => {
                    setAddress(address);
                }).catch(error => console.error(error));
            }).catch(error => console.error(error));
        }).catch(error => console.error(error));
    })

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                {!authService.isLoggedIn() ?
                    <button onClick={handleLoginClick}>Login to instantiate a wallet</button> :
                    <div>Logged in ! <p>
                        Your wallet and your account are instantiated<br/>
                        Your public key : ${publicKey}<br/>
                        Your address : ${address}<br/>
                        You can check your console to see the detail of these objects.
                    </p></div>}
            </header>
        </div>
    );
}

export default App;
