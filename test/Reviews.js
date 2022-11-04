const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Reviews Contract", function () {
  let deployer, users;

  before(async function() {
    [deployer, u1, u2, u3, u4] = await ethers.getSigners();
    users = [deployer.address, u1.address, u2.address, u3.address, u4.address];

    const Reviews = await ethers.getContractFactory("Reviews");
    this.reviews = await Reviews.deploy();
    await this.reviews.deployed();

    console.log(`deployer: ${users[0]}\ncontract: ${this.reviews.address}`)
  });

  it("Add on-chain comment and retrieve comment", async function (){
    const comments = ["test 1", "this is test 2!", "this is the last test"]
    await this.reviews.addUserComment(users[0], comments[0]);
    await this.reviews.addUserComment(users[0], comments[1]);
    await this.reviews.addUserComment(users[0], comments[2]);

    expect(await this.reviews.lookupUserComment(users[0], 1)).to.equal(comments[0]);
    expect(await this.reviews.lookupUserComment(users[0], 2)).to.equal(comments[1]);
    expect(await this.reviews.lookupUserComment(users[0], 3)).to.equal(comments[2]);
  });

});