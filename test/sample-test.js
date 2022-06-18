const { ethers } = require("hardhat");
const { expect, use } = require("chai");
const { solidity } = require("ethereum-waffle");
use(solidity);

describe("testing MYERC20", ()=>{
    let owner;
    let addr1;
    let addr2;
    let addrs;
    let myContract;
    let price;
    let totSupp;

    beforeEach(async ()=>{
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        const MYERC20 = await ethers.getContractFactory("MYERC20");
        myContract = await MYERC20.deploy();
        await myContract.deployed();
        console.log("Contract is deployed at",myContract.address );
        price = await myContract.tokenPrice();
        totSupp = await myContract.totalSupply();
    });
    describe("Constructor Test", ()=>{
        it("Total Supply Test", async ()=>{
            let supply = ethers.utils.parseEther("1000");
            expect(totSupp).to.equal(supply);
            let tokenbal = await myContract.balanceOf(owner.address);
            expect(tokenbal).to.equal(supply);
        });
    })
    describe("BuyFunction Test", ()=>{
        it("Testing valid Purchase", async ()=>{
            let msgval = ethers.utils.parseEther("1");
            let totTokens = msgval.mul(price);
            let conBalBefore = await ethers.provider.getBalance(myContract.address);
            await  expect(myContract.connect(addr1).buyTokens({ value:msgval }))
            .to.emit(myContract, 'BuyTokens').withArgs(owner.address, addr1.address, totTokens);
            let balAddr1 = await myContract.balanceOf(addr1.address);
            let balOwner = await myContract.balanceOf(owner.address);
            expect(balAddr1.add(balOwner)).to.equal(totSupp);
            let conBalAfter = await ethers.provider.getBalance(myContract.address);
            expect(conBalAfter.sub(conBalBefore)).to.equal(msgval);
        });
        it("testing with more bal", async ()=>{
            let msgval = ethers.utils.parseEther("11");
            let conBalBefore = await ethers.provider.getBalance(myContract.address);
            await expect(myContract.connect(addr1).buyTokens({ value:msgval })).to.be.revertedWith("Not enogh Tokens");
            let conBalAfter = await ethers.provider.getBalance(myContract.address);
            expect(conBalBefore).to.equal(conBalAfter);
        });
    });

});