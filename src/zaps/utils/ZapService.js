const Lender = require('../Lender');
const EthMaximalist = require('../EthMaximalist')

const Zap = {
    Lender,
    EthMaximalist
}

module.exports = class ZapService {
    constructor(zapName, provider){
        return new Zap[zapName](provider)
    }
}