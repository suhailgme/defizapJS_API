const ethers = require('ethers');
const ZapService = require('./zaps/utils/ZapService')

module.exports =  class DefiZap {
    // Associate with apiKey in future versions?
    constructor(apiKey = 'dev'){
        this.apiKey = apiKey
    }

    //Default provider is Infura homestead/mainnet and etherscan. Signer is for Metamask.
    async init(provider = null, signer = 'null'){
        let currentProvider
        switch(provider){
            case null:
                currentProvider = ethers.getDefaultProvider()
                break
            case 'metamask':
                currentProvider = new ethers.providers.Web3Provider(web3.currentProvider)
                signer = currentProvider.getSigner()
            default:
                throw "Provider must be empty or 'metamask'"
        }
        this.currentProvider = currentProvider
        this.signer = signer
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