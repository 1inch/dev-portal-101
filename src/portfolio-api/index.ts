import axios from "axios";

export async function getChart(token: string, vsCurrency: string, chainId: number, authKey: string): Promise<any | null> {
    try {
        const url = `https://api.1inch.dev/portfolio/v2/prices/token_prices/time_range?chain_id=${chainId}&contract_address=${token}&currency=${vsCurrency}&granularity=day
`
        const options = {
            method: 'POST',
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