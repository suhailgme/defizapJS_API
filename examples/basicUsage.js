const DefiZap = require('../src/DefiZap');

(async() => {
    const key = '0x372cea...' //privateKey used for test transactions, metamask support forthcoming
    const defiZap = new DefiZap()
    await defiZap.init() //init accepts a provider argument of 'metamask' or is left empty for default (infura/etherscan)

    const lenderZap = defiZap.zap('Lender')
    const lenderBalance = await lenderZap.getBalance()
    const lender = await lenderZap.useLenderFallback('0.01', key) //Invest 0.01 eth into the Lender contract (90% cDai, 10% dLETH2x)
    
    const ethMaxZap = defiZap.zap('EthMaximalist')
    const ethMaxBalance = await ethMaxZap.getBalance()
    const ethMax = await ethMaxZap.useEthMaximalistFallback('0.01', key) //Invest 0.01 eth into the Lender contract (50% dLETH2x, 50% dsWBTC)

    console.log(ethMaxBalance, lenderBalance, lender, ethMax)
})()