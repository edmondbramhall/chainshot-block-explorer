const { ethers } = require('ethers');
async function getBlockHeight() {
    const provider = new ethers.providers.AlchemyProvider("homestead");
    return await provider.getBlockNumber();
}
getBlockHeight().then(x => console.log(x));
