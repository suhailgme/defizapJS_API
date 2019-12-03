const DefiZap = require('../src/DefiZap');

(async () => {
    const defiZap = new DefiZap() //accepts a provider argument of window.web3 or is left empty for default (infura/etherscan) read-only access

    const lenderZap = defiZap.zap('Lender')
    const lenderAddress = lenderZap.address
    const lenderBalance = await lenderZap.getBalance()

    // const lender = await lenderZap.useLenderFallback('0.01') //Invest 0.01 eth into the Lender contract (90% cDai, 10% dLETH2x)

    const ethMaxZap = defiZap.zap('EthMaximalist')
    const ethMaxAddress = await ethMaxZap.address
    const ethMaxAddressBalance = await ethMaxZap.getBalance()

    // const ethMax = await ethMaxZap.useEthMaximalistFallback('0.01') //Invest 0.01 eth into the Eth Maximalist contract (50% dLETH2x, 50% dsWBTC)

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
        doubleBullAddress, doubleBullBalance
        )
})()