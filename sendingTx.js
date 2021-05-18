
const dotenv = require('dotenv').config()
var Tx       = require('ethereumjs-tx').Transaction
const Web3   = require('web3')

const nodeUrl = process.env.NODE_URL

const web3 = new Web3(nodeUrl)

const account1 = '0x92813C3c1D0df7a5C9E5bdC0f6395305Be4AB337'
const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')
const account2 = '0x1b33a3c291E941622C67B89464aDa1b52545278A'

web3.eth.getTransactionCount(account1, (err, txCount) => {
    if (err) console.log(err)
    // Prepare the transaction object
    const txObject = {
        nonce:    web3.utils.toHex(txCount),
        to:       account2,
        value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))  
    }

    // Sign the Tx
    const tx = new Tx(txObject, {'chain': 'ropsten'})
    tx.sign(privateKey1)

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    // Broadcast the Tx to the network
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        if (err) console.log(`Error sending Tx: ${err}`)
        console.log(`txHash: ${txHash}`)
    })
})

// todo: try getting the same result with web3.js 'signTransaction' method