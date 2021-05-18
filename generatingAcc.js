
const dotenv = require('dotenv').config()
const nodeUrl = process.env.NODE_URL
const Web3 = require('web3')
const web3 = new Web3(nodeUrl)


console.log(web3.eth.accounts.create())