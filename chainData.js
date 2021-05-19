const Web3 = require('web3')

const mainnetNodeUrl = 'https://eth-mainnet.alchemyapi.io/v2/rX1g7_DDKKM9Q8zrrHjdCkYnU01hgers'

const web3 = new Web3(mainnetNodeUrl)

async function getGasPrice() {
    const gasPrice = await web3.eth.getGasPrice()
    console.log(web3.utils.fromWei(gasPrice.toString(), 'gwei'))
    return gasPrice;
}

function getTxCostEst(gasPrice) {
    const txCostEst = gasPrice * 21000
    const toEth = web3.utils.fromWei(txCostEst.toString(), 'ether')
    console.log(toEth)
}

getGasPrice()
    .then(getTxCostEst)