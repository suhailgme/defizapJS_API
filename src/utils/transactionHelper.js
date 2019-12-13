const ethers = require('ethers')

const getTransactionInfo = async (provider, txHash) => {
    try {
        let tx = await provider.getTransaction(txHash)
        tx.gasPrice = tx.gasPrice.toString()
        tx.gasLimit = tx.gasLimit.toString()
        tx.value = tx.value.toString()
        return tx
    } catch (e) {
        throw "Transaction hash not found"
    }
}

const waitForTransaction = async (provider, txHash) => {
    return new Promise(resolve => {
        const check = async () => {
            const txInfo = await getTransactionInfo(provider, txHash);
            if (txInfo && txInfo.blockHash) {
                resolve(txInfo);
            } else {
                console.log(transactionInformation)
                setTimeout(check, 1000);
            }
        };
        check();
    });
}

module.exports = {
    getTransactionInfo,
    waitForTransaction
}