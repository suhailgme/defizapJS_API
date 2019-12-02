const ethers = require('ethers');
const ethMaxABI = require('../../contracts/abis/EthMaximalist.json')
const ethMaxAddress = require('../../contracts/addresses/ensMainnet.json').ETH_MAXIMALIST;

module.exports =  class EthMaximalist {
    constructor(provider = null){
        if(provider){
            this.lenderContract = new ethers.Contract(ethMaxAddress, ethMaxABI, provider)
            this.currentProvider = provider
            console.log('Eth Maximalist Zap initialized')
        }
    }

    // Returns Eth Maximalist contract balance as a Big Number.
    async getBalance() {
        return await this.lenderContract.balance()
    }

    // Returns owner of Eth Maximalist contract as a string
    async getOwner(){
        return await this.lenderContract.owner()
    }

    // Basic sending of Ether to the fallback function of the Eth Maximalist contract
    // !!! Initiates the sending of Ether !!!
    async useEthMaximalistFallback(amount, key){
        let pk = key // privateKey used for test transactions, metamask support forthcoming
        let wallet = new ethers.Wallet(pk, this.currentProvider)
        let valueToInvest = ethers.utils.parseEther(amount)
        let txInfo = {
            to: ethMaxAddress,
            value: valueToInvest,
            gasLimit: 5000000,
        }
 
        let tx = await wallet.sendTransaction(txInfo)
        return tx

    }

}
