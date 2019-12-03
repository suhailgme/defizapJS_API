const ethers = require('ethers');
const ethMaxABI = require('../../contracts/abis/EthMaximalist.json')
const ethMaxAddress = require('../../contracts/addresses/ensMainnet.json').EthMaximalist;

module.exports = class EthMaximalist {
    constructor(provider, web3) {
        this.contract = new ethers.Contract(ethMaxAddress, ethMaxABI, provider)
        this.currentProvider = provider
        this.signer = web3 ? this.currentProvider.getSigner() : null //Get signer from Metamask or set to null for readonly access
        this.address = ethMaxAddress
        console.log('Eth Maximalist Zap initialized')
    }

    // Returns contract balance as a string.
    async getBalance() {
        let balance =  await this.contract.balance()
        return ethers.utils.formatEther(balance.toString())
    }

    // Returns owner of contract as a string
    async getOwner() {
        return await this.contract.owner()
    }

    // Basic sending of Ether to the fallback function of the contract
    // !!! Initiates the sending of Ether !!!
    async useFallback(amount) {
        const resolvedEnsAddress = await this.currentProvider.resolveName(this.address) //ENS name needs to be resolved for use with Metamask
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
