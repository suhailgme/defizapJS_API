const GenericZap = require('../zaps/GenericZap')

const Zap = {

}

module.exports = class ZapService {
    constructor(zapName, provider, web3){
        if(Zap.hasOwnProperty(zapName)) return new Zap[zapName](provider, web3)
        else return new GenericZap(zapName, provider, web3)
    }
}