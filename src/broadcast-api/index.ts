import axios from "axios";

export async function broadCastRawTransaction(rawTransaction: any, chainId: number, authKey: string, isPrivate = false): Promise<string | null> {
    try {
        let url = "https://api.1inch.dev/tx-gateway/v1.1/" + chainId + "/broadcast";
        if (chainId === 1 && isPrivate) {
            url = "https://api.1inch.dev/tx-gateway/v1.1/" + chainId + "/flashbots";
        }
        const options = {
            method: 'POST',
            url,
            data: {rawTransaction: rawTransaction},
            headers: {
                'Authorization': `Bearer ${authKey}`,
                'Content-Type': 'application/json',
            },
        };
        const result = await axios.request(options);
        return result.data.transactionHash
    } catch (e) {
        console.error(e)
        return null
    }
}