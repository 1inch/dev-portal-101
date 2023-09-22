import {TokenSearchResult} from "../token-api/types";
import axios from "axios";

export async function getPrices(tokens: string[], vsCurrency: string, chainId: number, authKey: string): Promise<TokenSearchResult | null> {
    try {
        const tokensString = tokens.join(',')

        let url = `https://api.1inch.dev/price/v1.1/${chainId}/${tokensString}?currency=${vsCurrency}`
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
