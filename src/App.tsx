import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import authService from "./services/auth-service";
import {Eniblock, UnsafeStorage} from "@eniblock/sdk";
import {useLocation} from "react-router-dom";

function App(): React.JSX.Element {

    const [publicKey, setPublicKey] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [sdk, setSdk] = useState<Eniblock>();
    const location = useLocation();
    const accessToken = location?.state?.accessToken ?? '';

    const handleLoginClick = () => {
        setTimeout(() => console.log('Log in progress'), 2000);
        authService.login().then(() => {
            console.log('Logged in');
        }).catch((error) => {
            console.error('Login error: ', error);
        })
    }

    useEffect(() => {
        console.log(`access token : ${accessToken}`);
        const fetchSdk = async () => {
            if (authService.isLoggedIn()) {
                console.log('fetch sdk');
                setSdk(new Eniblock({
                    appId: process.env.APP_ID!,
                    tssConfig: {
                        wasmPath: "wasm/eniblock.wasm",
                        kmsVerify: true,
                    },
                    accessTokenProvider: (() => Promise.resolve(accessToken)),
                    storageItems: [{alias: "UnsafeStorage", storage: new UnsafeStorage()}],
                }));
            }
            return {};
        }
        console.log('effect');

        fetchSdk().then(() => {
            console.log('succeeded')
        }).catch(reason => console.error(reason));
    }, [accessToken]);

    useEffect(() => {
        if (sdk) {
            const fetchAccount = async () => {
                if (sdk) {
                    const wallet = await sdk.wallet.instantiate();
                    console.log(wallet);
                    const account = await wallet.account.instantiate('My first account');
                    console.log(account);
                    const publicKeyFromAccount = await account.getPublicKey();
                    setPublicKey(publicKeyFromAccount);

                    const addressFromAccount = await account.getAddress();
                    setAddress(addressFromAccount);

                    return {wallet, account, publicKeyFromAccount, addressFromAccount}
                }
            }
            fetchAccount().then(walletAndAccount => {
                console.log('succeeded');
                console.log(walletAndAccount);
            }).catch(reason => console.error(reason));
        }
    }, [sdk]);

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
                {publicKey &&
                    <div>Logged in !
                        <p>Your wallet and your account are instantiated<br/></p>
                        <p>Your public key : {publicKey}<br/></p>
                        <p>Your address : {address}<br/></p>
                        <p>You can check your console to see the detail of these objects.</p>
                    </div>
                }
                {!publicKey &&
                    <>
                        <button onClick={handleLoginClick}>Login to instantiate a wallet</button>
                    </>
                }
            </header>
        </div>
    );
}

export default App;
