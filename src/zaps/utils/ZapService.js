const Lender = require('../Lender');
const EthMaximalist = require('../EthMaximalist')
const ModerateBull = require('../ModerateBull')

const Zap = {
    Lender,
    EthMaximalist,
    ModerateBull,
}

module.exports = class ZapService {
    constructor(zapName, provider, web3){
        return new Zap[zapName](provider, web3)
    }
}