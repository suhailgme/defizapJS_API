const DefiZap = require('../src/DefiZap');
(async () => {
    const defiZap = new DefiZap() //accepts a provider argument of window.web3 or is left empty for default (infura/etherscan) read-only access
    const gasPrice = await defiZap.getGasPrice()

    const lenderZap = defiZap.zap('Lender')
    const lenderAddress = lenderZap.address
    const lenderBalance = await lenderZap.getBalance()

    // Invest 0.01 eth into the Lender contract (90% cDai, 10% dLETH2x)
    // Optional argument gasPrice is a string

    // const lender = await lenderZap.useFallback('0.01', gasPrice.fast)  

    const ethMaxZap = defiZap.zap('EthMaximalist')
    const ethMaxAddress = await ethMaxZap.address
    const ethMaxAddressBalance = await ethMaxZap.getBalance()

    // Invest 0.01 eth into the Eth Maximalist contract (50% dLETH2x, 50% dsWBTC).
    // Omitting optional gas price argument uses median gas price from last blocks
    
    // const ethMax = await ethMaxZap.useFallback('0.01') 

    const moderateBullZap = defiZap.zap('ModerateBull')
    const moderateBullAddress = await moderateBullZap.address
    const moderateBullBalance = await moderateBullZap.getBalance()

    const superSaverZap = defiZap.zap('SuperSaver')
    const superSaverAddress = await superSaverZap.address
    const superSaverBalance = await superSaverZap.getBalance()

    const doubleBullZap = defiZap.zap('DoubleBull')
    const doubleBullAddress = await doubleBullZap.address
    const doubleBullBalance = await doubleBullZap.getBalance()



    console.log(
        lenderAddress, lenderBalance, 
        ethMaxAddress, ethMaxAddressBalance, 
        moderateBullAddress, moderateBullBalance,
        superSaverAddress, superSaverBalance,
        doubleBullAddress, doubleBullBalance,
        gasPrice.fast, gasPrice.average, gasPrice.slow 
        )
})()