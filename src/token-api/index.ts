import axios from "axios";
import {TokenListResult, TokenSearchResult} from "./types";

export async function search(query: string, chainId: number, authKey: string): Promise<TokenSearchResult | null> {
    try {
        let url = `https://api.1inch.dev/token/v1.2/${chainId}/search?query=${query}&ignore_listed=false&limit=10`;
        const options = {
            method: 'GET',
            url,
            headers: {
                'Authorization': `Bearer ${authKey}`,
                'Content-Type': 'application/json',
            },
        };
        const result = await axios.request(options);
        return result.data
    } catch (e) {
        console.error(e)
        return null
    }
}

export async function getTokenList(provider: string, chainId: number, authKey: string): Promise<TokenListResult | null> {
    try {
        let url = `https://api.1inch.dev/token/v1.2/${chainId}/token-list?provider=${provider}`;
        const options = {
            method: 'GET',
            url,
            headers: {
                'Authorization': `Bearer ${authKey}`,
                'Content-Type': 'application/json',
            },
        };
        const result = await axios.request(options);
        return result.data
    } catch (e) {
        console.error(e)
        return null
    }
}


