import axios from "axios";

export async function getBalances(tokens: string[], address: string, chainId: number, authKey: string): Promise<any | null> {
    try {
        const url = `https://api.1inch.dev/balance/v1.2/${chainId}/balances/${address}`;

        const body = {
            "tokens": tokens,
        }
        const options = {
            method: 'POST',
            url,
            data: body,
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

export async function getBalancesAndAllowances(tokens: string[], address: string, spender: string, chainId: number, authKey: string): Promise<any | null> {
    try {
        const url = `https://api.1inch.dev/balance/v1.2/${chainId}/allowancesAndBalances/${spender}/${address}`;

        const body = {
            "tokens": tokens,
        }
        const options = {
            method: 'POST',
            url,
            data: body,
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