const { ethers, getNamedAccounts } = require("hardhat")

async function main() {
    const sendValue = ethers.parseEther("0.5")
    const { deplpoyer } = await getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe", deplpoyer)
    console.log("Funding Contract...")
    const transactionResponse = await fundMe.fund({
        value: sendValue,
    })
    await transactionResponse.wait(1)
    console.log("Funded successfully!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
