const Lender = require('../zaps/Lender');
const EthMaximalist = require('../zaps/EthMaximalist')
const ModerateBull = require('../zaps/ModerateBull')
const SuperSaver = require('../zaps/SuperSaver')
const DoubleBull = require('../zaps/DoubleBull')

const Zap = {
    Lender,
    EthMaximalist,
    ModerateBull,
    SuperSaver,
    DoubleBull,
}

module.exports = class ZapService {
    constructor(zapName, provider, web3){
        return new Zap[zapName](provider, web3)
    }
}