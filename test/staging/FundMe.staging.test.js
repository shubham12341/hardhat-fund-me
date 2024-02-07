const { ethers, getNamedAccounts, network } = require("hardhat")
const { developmentChains } = require("..//../helper-hardhat-config")
const { assert, expect } = require("chai")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          let deployer
          let fundMe
          const sendValue = ethers.parseEther("1")

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContractAt("FundMe", deployer)
          })

          it("allows people to fund and withdraw...", async function () {
              await fundMe.fund({ value: sendValue })
              await fundMe.withdraw()
              const endingFundMeBalance = await ethers.provider.getBalance(
                  fundMe.target
              )
              assert.equal(endingFundMeBalance, 0)
          })
      })
