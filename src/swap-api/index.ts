import axios from "axios";
import Web3 from "web3";
import {broadCastRawTransaction} from "../broadcast-api";

export async function getQuote(from: string, to: string, amount: string, authKey: string): Promise<string | null> {
    try {
        const options = {
            method: 'GET',
            url: `https://api.1inch.dev/swap/v5.2/1/quote?src=${from}&dst=${to}&amount=${amount}`,
            headers: {
                'Authorization': `Bearer ${authKey}`,
            },
        };
        const result = await axios.request(options);
        return result.data.toAmount
    } catch (e) {
        console.error(e)
        return null
    }
}

export async function buildSwapTx(from: string, to: string, amount: string, fromAddress: string, slippage: number, network: number, authKey: string): Promise<string | null> {
    try {
        const options = {
            method: 'GET',
            url: `https://api.1inch.dev/swap/v5.2/${network}/swap?src=${from}&dst=${to}&amount=${amount}&from=${fromAddress}&slippage=${slippage}`,
            headers: {
                'Authorization': `Bearer ${authKey}`,
            },
        };
        const result = await axios.request(options);
        return result.data.tx;
    } catch (e) {
        console.error(e)
        return null
    }
}

export async function signAndSendTransaction(web3: Web3, pk: string, transaction: any,network: number, authKey: string, isPrivate = false): Promise<any> {
    const {rawTransaction} = await web3.eth.accounts.signTransaction(transaction, pk);

    return await broadCastRawTransaction(rawTransaction, network, authKey, isPrivate);
}

export function getAddressFromPrivateKey(privateKey: string): string {
    const web3 = new Web3();
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    return account.address;
}