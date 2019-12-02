const ethers = require('ethers');
const abiHelper = require('../utils/abiHelper')
const addressHelper = require('../utils/addressHelper')

module.exports = class GenericZap {
    constructor(provider, web3, zap) {
        const zapABI = abiHelper(zap)
        const zapAddress = addressHelper(zap)
        this.zapContract = new ethers.Contract(zapAddress, zapABI, provider)
        this.currentProvider = provider
        this.signer = web3 ? this.currentProvider.getSigner() : null //Get signer from Metamask or set to null for readonly access
        this.name = zap
        this.address = zapAddress
        console.log(`${zap} Zap initialized`)
    }

    // Returns Lender contract balance as a Big Number.
    async getBalance() {
        return await this.zapContract.balance()
    }

    // Returns owner of contract as a string
    async getOwner() {
        return await this.zapContract.owner()
    }

    // Basic sending of Ether to the fallback function of the Lender contract
    // !!! Initiates the sending of Ether !!!
    async useFallback(amount) {
        resolvedEnsAddress = await this.currentProvider.resolveName(zapAddress)
        let valueToInvest = ethers.utils.parseEther(amount)
        let txInfo = {
            to: resolvedEnsAddress,
            value: valueToInvest,
            gasLimit: 5000000,
        }

        let tx = await this.signer.sendTransaction(txInfo)
        return tx

    }

}
