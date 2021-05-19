const Web3 = require('web3')
const fetch = require('fetch')

const mainnetNodeUrl = 'https://eth-mainnet.alchemyapi.io/v2/rX1g7_DDKKM9Q8zrrHjdCkYnU01hgers'
const fetchEthUsdPriceUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'

const web3 = new Web3(mainnetNodeUrl)

async function getGasPrice() {
    const gasPriceWei = await web3.eth.getGasPrice()
    let gasPriceGwei = web3.utils.fromWei(gasPriceWei.toString(), 'gwei')
    gasPriceGwei = maxDecimals(gasPriceGwei, 0)
    console.log(`Gas price: ${gasPriceGwei} Gwei`)
    return gasPriceWei;
}

function getTxCostEst(gasPrice) {
    const txCostWei = gasPrice * 21000
    const txCostEth = web3.utils.fromWei(txCostWei.toString(), 'ether')
    let txCostEthNum = parseFloat(txCostEth, 10)
    txCostEthNum = maxDecimals(txCostEthNum, 5)
    console.log(`Tx cost ETH: ${txCostEthNum} ETH`)
    return txCostEthNum;
}

async function convertToUsd(ethPrice) {
    await fetch.fetchUrl(fetchEthUsdPriceUrl, (err, meta, body) => {
        const parsedData = JSON.parse(body.toString())
        const ethUsdPrice = parsedData.ethereum.usd
        const txPriceUsd = maxDecimals(ethPrice * ethUsdPrice, 2)
        
        console.log(`Tx cost USD: ${txPriceUsd} USD`)
    })
}

// helper function to adjust the desired number of decimals
function maxDecimals(num, decimals) {
    const truncator = 10 ** decimals
    const truncatedNum = Math.floor(num * truncator) / truncator
    return truncatedNum;
}

getGasPrice()
    .then(getTxCostEst)
    .then(convertToUsd)