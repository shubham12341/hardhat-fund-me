// async function deployFun() {
//     console.log("Hii")
//      hre.getNamedAccounts
//      hre.deployments
// }
// module.exports.default = deployFun
// module.exports = async (hre) => {
//     const { getNamedAccounts, deployments } = hre
// }
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { network, deployments, ethers } = require("hardhat")
const { verify } = require("../utils/verify")

//const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    // When working with localhost or hardhat network we want to use a mock
    //const args = [ethUsdPriceFeedAddress]

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress], // addresses of the different PriceFeed
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args)
    }
    log("-------------------------------------------")
}

module.exports.tags = ["all", "fundme"]
