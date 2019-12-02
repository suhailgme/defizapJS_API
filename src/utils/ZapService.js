const Lender = require('../zaps/Lender');
const EthMaximalist = require('../zaps/EthMaximalist')
const ModerateBull = require('../zaps/ModerateBull')

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