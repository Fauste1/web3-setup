
const Web3 = require('web3')
const dotenv = require('dotenv').config()

const nodeUrl = process.env.NODE_URL

let web3 = new Web3(nodeUrl)

const ethAddress = '0x92813C3c1D0df7a5C9E5bdC0f6395305Be4AB337'

web3.eth.getBalance(ethAddress, (err, wei) => {
    balance = web3.utils.fromWei(wei, 'ether')
    console.log(balance)
})

const txHash = '0x9e4fbc5778cb7af79f611987478d95464c3497e56b7285f99e2010f50ed734ff'

web3.eth.getTransaction(txHash, (err, res) => {
    value = web3.utils.fromWei(res.value)
    console.log(`Tx nonce: ${res.nonce}`)
    console.log(`Tx value: ${value} ETH`)
})