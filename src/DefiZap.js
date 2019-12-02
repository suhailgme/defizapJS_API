const ethers = require('ethers');
const ZapService = require('./zaps/utils/ZapService')

module.exports =  class DefiZap {
    //Default (blank) provider is Infura homestead/mainnet and etherscan, otherwise provider should be 'window.web3' for Metamask
    constructor(provider){
        if(provider){
            this.currentProvider = new ethers.providers.Web3Provider(provider.currentProvider) //This is the same as window.web3.currentProvider
            console.log('Connected with MetaMask')
        }else{
            this.currentProvider = ethers.getDefaultProvider()
            console.log('Using Infura/Etherscan provider', provider)
        }
        console.log('Successfully initialized DefiZap')
    }

    // Switch signers among Metamask, ledger, etc. if needed
    // Returns true if successful, false otherwise
    changeSigner(signer){
        if(this.signer !== signer){
            this.signer = signer
            return true
        }
        return false
    }

    // Initializes a new Zap with the given name (e.g. Lender, EthMaximalist, etc.)
    zap(zapToUse){
        this[zapToUse] = new ZapService(zapToUse, this.currentProvider)
        return this[zapToUse]
    }

}