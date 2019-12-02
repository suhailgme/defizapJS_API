const ethers = require('ethers');
const ethMaxABI = require('../../contracts/abis/EthMaximalist.json')
const ethMaxAddress = require('../../contracts/addresses/ensMainnet.json').EthMaximalist;

module.exports = class EthMaximalist {
    constructor(provider, web3) {
        this.ethMaximalistContract = new ethers.Contract(ethMaxAddress, ethMaxABI, provider)
        this.currentProvider = provider
        this.signer = web3 ? this.currentProvider.getSigner() : null //Get signer from Metamask or set to null for readonly access
        this.address = ethMaxAddress
        console.log('Eth Maximalist Zap initialized')
    }

     // Returns Eth Maximalist contract balance as a Big Number.
    async getBalance() {
        return await this.ethMaximalistContract.balance()
    }

    // Returns owner of Eth Maximalist contract as a string
    async getOwner() {
        return await this.ethMaximalistContract.owner()
    }

    // Basic sending of Ether to the fallback function of the Eth Maximalist contract
    // !!! Initiates the sending of Ether !!!
    async useEthMaximalistFallback(amount) {
        const resolvedEnsAddress = await this.currentProvider.resolveName(ethMaxAddress) //ENS name needs to be resolved for use with Metamask
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
