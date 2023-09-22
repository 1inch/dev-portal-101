// import {PrivateKeyProviderConnector} from "@1inch/fusion-sdk";
import {
    authKey,
    ethNetworkRPC,
    NativeToken, network,
    OneInchRouter,
    OneInchToken,
    OneInchTokenAmount,
    pk,
    sleep
} from "./config/config";
// import Web3 from "web3";
import {buildSwapTx, getAddressFromPrivateKey, getQuote, signAndSendTransaction} from "./swap-api";
import {approveERC20Token} from "./swap-api/approve";
import Web3 from "web3";


const DO_APPROVE = false;
const DO_SWAP = false;
const DO_QUOTE = false;

// const DO_CHECK_ORDERS = false;

async function main() {

    const web3 = new Web3(new Web3.providers.HttpProvider(ethNetworkRPC));

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
        console.log(resultsQuote);
    }

    if (DO_SWAP) {
        const swapTx = await buildSwapTx(OneInchToken, NativeToken, OneInchTokenAmount, getAddressFromPrivateKey(pk), 1, network, authKey)
        await sleep(1001);

        const txHash = await signAndSendTransaction(web3, pk, swapTx, network, authKey);
        console.log(txHash);
    }

}

main()