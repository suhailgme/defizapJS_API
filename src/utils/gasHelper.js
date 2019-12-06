const fetch = require('node-fetch');
const ethers = require('ethers');
const ethGasStation = 'https://ethgasstation.info/json/ethgasAPI.json'

// Fast: Mined within 2 minutes
// Average: Mined within 5 minutes
// Slow: Mined within 30 minutes
module.exports = async (provider) => {
    try {
        let gasPrices = await (await fetch(ethGasStation)).json()
        return {
            fast: (gasPrices.fast / 10).toFixed(1),
            average: (gasPrices.average / 10.).toFixed(1),
            slow: (gasPrices.safeLow / 10).toFixed(1)
        }
    } catch (e) {
        // If Eth Gas Station API is unavailable, use Ethers.js default provider for the gas price. 
        // Returns identical gas price for fast, average, and slow speed representing the average gas price
        let gasPriceFallback = (await provider.getGasPrice()).toString()
        gasPriceFallback = ethers.utils.formatUnits(gasPriceFallback, 'gwei')
        return {
            fast: gasPriceFallback,
            average: gasPriceFallback,
            slow: gasPriceFallback
        }
    }
}
