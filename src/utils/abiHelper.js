const fs = require('fs')

module.exports = (zap) =>{
    return JSON.parse(fs.readFileSync(`../contracts/abis/${zap}.json`))

}
