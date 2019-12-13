const ensAddresses = require('../../contracts/addresses/ensMainnet.json')
const addresses = require('../../contracts/addresses/mainnet.json')

module.exports = (zap) => {
    if(zap === 'ServiceProviderEthSaiZap' || zap === 'ServiceProviderEthSethZap')
        return addresses[zap]
    return ensAddresses[zap]
}