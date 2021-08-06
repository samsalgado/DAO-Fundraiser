const {expectRevert, time} = require('@openzeppelin/test-helpers');
const Dao = artifacts.require("Dao");
contract("Dao", (accounts) => {
    let dao = null;
    const [member1, member2, member3] = [
        accounts[1],
        accounts[2],
        accounts[3],
    ];
    before(async() => {
        dao = await Dao.new(1, 1, 50);
    });
    it("should add a contribution", async() => {
        await dao.contribute({from: member1, value: 40});
        await dao.contribute({from: member2, value: 50});
        await dao.contribute({from: member3, value:100});
        const funds1 = await dao.funds(member1);
        const funds2 = await dao.funds(member2);
        const funds3 = await dao.funds(member3);
        assert(funds1.toNumber() === 40);
        assert(funds2.toNumber() === 50);
        assert(funds3.toNumber() === 100);
    });    it("should withdraw ether", async() => {
        const balanceBefore = await Web3.eth.getBalance(accounts[0]);
        await dao.withdrawEther(10, accounts[0]);
        const balanceAfter = await web3.eth.getBalance(accounts[0]);
        const balanceBeforeBN = web3.utils.toBN(balanceBefore);
        const balanceAfterBN = web3.utils.toBN(balanceAfter);
        assert(balanceAfterBN.sub(balanceBeforeBN).toNumber() === 10);
    });
    it("should return funds to given address", async() => {
        await dao.getFunds();
        const projects = await dao.projects(0);
        assert(projects.id === 0);
        assert(projects.name === "name");
        assert(projects.amount.toNumber() === 10000);
        assert(projects.recipient === {to: accounts[0]});
    });
    it("should enable redeeming funds", async() => {
        await dao.redeemFunds({from: member1, amount: 100});
        await dao.redeemFunds({from: member2, amount: 100});
        await dao.redeemFunds({from: member3, amount:100});
        const availableFunds = await web3.eth.getBalance(accounts[0]);
        assert(availableFunds === accounts[0]);
    })
})
