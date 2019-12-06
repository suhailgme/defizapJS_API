const ethers = require('ethers');
const abiHelper = require('../utils/abiHelper')
const addressHelper = require('../utils/addressHelper')

module.exports = class GenericZap {
    constructor(zap, provider, web3) {
        const zapABI = abiHelper(zap)
        const zapAddress = addressHelper(zap)
        this.contract = new ethers.Contract(zapAddress, zapABI, provider)
        this.currentProvider = provider
        this.signer = web3 ? this.currentProvider.getSigner() : null //Get signer from Metamask or set to null for readonly access
        this.name = zap
        this.address = zapAddress
        console.log(`${zap} Zap initialized`)
    }

    // Returns Lender contract balance as a Big Number.
    async getBalance() {
        let balance =  await this.contract.balance()
        return ethers.utils.formatEther(balance.toString())
    }

    // Returns owner of contract as a string
    async getOwner() {
        return await this.contract.owner()
    }

    // Basic sending of Ether to the fallback function of the Lender contract
    // !!! Initiates the sending of Ether !!!
    async useFallback(amount, price) {
        const resolvedEnsAddress = await this.currentProvider.resolveName(this.address)
        let valueToInvest = ethers.utils.parseEther(amount)
        let gasPriceHex
        if(price) gasPriceHex = ethers.utils.parseUnits(price, 'gwei')
        else gasPriceHex = await this.currentProvider.getGasPrice()
        let txInfo = {
            to: resolvedEnsAddress,
            value: valueToInvest,
            gasLimit: 5000000,
            gasPrice: gasPriceHex
        }
        let tx = await this.signer.sendTransaction(txInfo)
        return tx

    }

}
