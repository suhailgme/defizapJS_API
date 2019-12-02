const ethers = require('ethers');
const lenderABI = require('../../contracts/abis/Lender.json')
const lenderAddress = require('../../contracts/addresses/ensMainnet.json').LENDER;

module.exports =  class Lender {
    constructor(provider = null, signer = null){
        if(provider){
            this.lenderContract = new ethers.Contract(lenderAddress, lenderABI, provider)
            this.currentProvider = provider
            console.log('Lender Zap initialized')
        }
    }

    // Returns Lender contract balance as a Big Number.
    async getBalance() {
        return await this.lenderContract.balance()
    }

    // Returns owner of contract as a string
    async getOwner(){
        return await this.lenderContract.owner()
    }

    // Basic sending of Ether to the fallback function of the Lender contract
    // !!! Initiates the sending of Ether !!!
    async useLenderFallback(amount, key){
        let pk = key // privateKey used for test transactions, metamask support forthcoming
        let wallet = new ethers.Wallet(pk, this.currentProvider)
        let valueToInvest = ethers.utils.parseEther(amount)
        let txInfo = {
            to: lenderAddress,
            value: valueToInvest,
            gasLimit: 5000000,
        }
 
        let tx = await wallet.sendTransaction(txInfo)
        return tx

    }

}
