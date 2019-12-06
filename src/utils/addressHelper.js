const addresses = require('../../contracts/addresses/ensMainnet.json')

module.exports = (zap) => {
    return addresses[zap]
}