// This module returns a singleton instance of Web3 
// and does a prior pre-validation of RPC URL
const axios = require('axios')
const Web3 = require('web3')
const HDWalletProvider = require("truffle-hdwallet-provider");
const assert = require('assert')


let web3Instance

async function getWeb3(options){
    if(!web3Instance){
        assert(options.ethereumURL, "ethereumURL param required")
        try{
            response = await axios.post(
                options.ethereumURL,
                {"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}
            )
            assert(response.data.result, "ethereumURL must be an Ethereum RPC node")
        }
        catch(e){
            throw Error("ethereumURL must be a valid ethereum rpc endpoint")
        }

        // If Mnemonic or private key provided, use it
        if (process.env.MNEMONIC){
            web3Instance = new Web3(new HDWalletProvider(process.env.MNEMONIC, options.ethereumURL))
        }
        else if(process.env.PK){
            const privateKeys = process.env.PK.split(',') // Private keys separated by comma
            web3Instance = new Web3(new HDWalletProvider(), privateKeys)
        }
        else{
            web3Instance = new Web3(options.ethereumURL)
        }

        return web3Instance
    }
    else{
        return web3Instance
    }
}

module.exports = getWeb3