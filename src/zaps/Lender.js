const ethers = require('ethers');
const lenderABI = require('../../contracts/abis/Lender.json')
const lenderAddress = require('../../contracts/addresses/mainnet.json').LENDER; //TODO: ENS names need to be resolved when using Metamask

module.exports = class Lender {
    constructor(provider, web3) {
        this.lenderContract = new ethers.Contract(lenderAddress, lenderABI, provider)
        this.currentProvider = provider
        this.signer = web3 ? this.currentProvider.getSigner() : null //Get signer from Metamask or set to null for readonly access
        console.log('Lender Zap initialized')
    }

    // Returns Lender contract balance as a Big Number.
    async getBalance() {
        return await this.lenderContract.balance()
    }

    // Returns owner of contract as a string
    async getOwner() {
        return await this.lenderContract.owner()
    }

    // Basic sending of Ether to the fallback function of the Lender contract
    // !!! Initiates the sending of Ether !!!
    async useLenderFallback(amount) {
        let valueToInvest = ethers.utils.parseEther(amount)
        let txInfo = {
            to: lenderAddress,
            value: valueToInvest,
            gasLimit: 5000000,
        }

        let tx = await this.signer.sendTransaction(txInfo)
        return tx

    }

}
