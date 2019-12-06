const ethers = require('ethers');
const ZapService = require('./utils/ZapService')
const gasHelper = require('./utils/gasHelper')

module.exports = class DefiZap {
    //Default (blank) provider is Infura homestead/mainnet and etherscan, otherwise provider should be 'window.web3' for Metamask
    constructor(provider) {
        if (provider) {
            this.currentProvider = new ethers.providers.Web3Provider(provider.currentProvider) //This is the same as window.web3.currentProvider
            this.web3 = true
            console.log('Connected with MetaMask')
        } else {
            this.currentProvider = ethers.getDefaultProvider()
            this.web3 = false
            console.log('Using Infura/Etherscan provider')
        }
        console.log('Successfully initialized DefiZap')
    }

    async getGasPrice() {
        return await gasHelper(this.currentProvider)
    }

    changeProvider(provider) {
        if (this.currentProvider !== provider) {
            this.currentProvider = new ethers.providers.Web3Provider(provider.currentProvider)
            return true
        }
        return false
    }

    // Initializes a new Zap with the given name (e.g. Lender, EthMaximalist, etc.)
    zap(zapToUse) {
        this[zapToUse] = new ZapService(zapToUse, this.currentProvider, this.web3)
        return this[zapToUse]
    }

}