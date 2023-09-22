import axios from "axios";


export async function getTxTrace(txHash: string, block: number, chainId: number, authKey: string): Promise<any | null> {
    try {
        const url = `https://api.1inch.dev/traces/v1.0/chain/${chainId}/block-trace/${block}/tx-hash/${txHash}`
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

export async function getInterval(chainId: number, authKey: string): Promise<any | null> {
    try {
        const url = `https://api.1inch.dev/traces/v1.0/chain/${chainId}/synced-interval`
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
