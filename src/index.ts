import {
    authKey,
    ethNetworkRPC,
    NativeToken,
    network,
    OneInchRouter,
    OneInchToken,
    OneInchTokenAmount,
    pk,
    sleep
} from "./config/config";
import {buildSwapTx, getAddressFromPrivateKey, getQuote, signAndSendTransaction} from "./swap-api";
import {approveERC20Token} from "./swap-api/approve";
import Web3 from "web3";
import {getTokenList, search} from "./token-api";


const DO_APPROVE = false;
const DO_SEARCH = true;
const DO_SWAP = false;
const DO_QUOTE = false;

// const DO_CHECK_ORDERS = false;

async function main() {

    const web3 = new Web3(new Web3.providers.HttpProvider(ethNetworkRPC));


    if (DO_SEARCH) {
        const searchResult = await search('1inch', network, authKey)
        if (searchResult) {
            console.log('-------------------')
            console.log('searchResult, ', searchResult);
            console.log('-------------------')
        }

        await sleep(1001);

        if (!searchResult || searchResult.length === 0) {
            throw new Error('No result found');
        }

        const tokenProvider = searchResult[0].providers[0];
        const tokenListByProvider = await getTokenList(tokenProvider, network, authKey);

        if (tokenListByProvider) {
            console.log('-------------------')
            console.log('tokenListByProvider, ', tokenListByProvider);
            console.log('-------------------')
        }
    }

    if (DO_APPROVE) {
        const approveResult = await approveERC20Token(web3, OneInchToken, pk, OneInchRouter, OneInchTokenAmount)
        if (approveResult) {
            console.log('-------------------')
            console.log('Approved');
            console.log('-------------------')
        }
    }

    if (DO_QUOTE) {
        const resultsQuote = await getQuote(OneInchToken, NativeToken, OneInchTokenAmount, authKey)
        console.log(`to token amount: ${resultsQuote}`);
        await sleep(1001);
    }

    if (DO_SWAP) {
        const swapTx = await buildSwapTx(OneInchToken, NativeToken, OneInchTokenAmount, getAddressFromPrivateKey(pk), 1, network, authKey)
        await sleep(1001);

        const txHash = await signAndSendTransaction(web3, pk, swapTx, network, authKey);
        console.log(txHash);
    }

}

main()