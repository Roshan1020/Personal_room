//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;
import "hardhat/console.sol";

import { ISuperfluid, ISuperToken } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import { ISuperfluidToken } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluidToken.sol";
import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import {CFAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";

interface ISemaphore {
  function verifyProof(uint256 groupdId, bytes32 signal, uint256 nullifierHash, uint256 externalNullifier, uint256[8] calldata proof) external;
}

contract SFRouter {
  address public owner;
  uint256 public roomNumber = 0;
  ISemaphore public semaContract;

  using CFAv1Library for CFAv1Library.InitData;
  CFAv1Library.InitData public cfaV1; //initialize cfaV1 variable
  
  mapping (uint256 => bool) public roomStatus;
  mapping (address => bool) public daoMembers;

  constructor(ISuperfluid host, address _owner, ISemaphore _semaContract) {
    assert(address(host) != address(0));
    owner = _owner;
    semaContract = _semaContract;
    console.log("Deploying a Money Router with owner:", owner);

    cfaV1 = CFAv1Library.InitData( //initialize InitData struct, and set equal to cfaV1 
    host, //here, we are deriving the address of the CFA using the host contract
    IConstantFlowAgreementV1(
      address(host.getAgreementClass(keccak256("org.superfluid-finance.agreements.ConstantFlowAgreement.v1")))
      )
    );
  }

  // CREATE ROOM
  function createRoom() external returns (uint256) {
    roomNumber++;
    roomStatus[roomNumber] = true;
    return roomNumber;
  }

  // add security: 1 addr => 3 rooms per day
  function closeRoom(uint256 roomId) external {
    roomStatus[roomId] = false;
  }

  // SEND TRANSACTION
  function sendTransaction(
    uint256 groupdId, 
    bytes32 signal, 
    uint256 nullifierHash, 
    uint256 externalNullifier, 
    uint256[8] calldata proof, 
    // bytes32 signedMessage, 
    uint256 roomId,
    ISuperfluidToken token
    ) external { 
    
    //1.Call VerifyProof from Semaphore Contract
    semaContract.verifyProof(groupdId, signal, nullifierHash, externalNullifier, proof);

    //2.Check if roomStatus is True
    require(roomStatus[roomId] == true);

    //3.Check if ExternalNullifier = roomId
    require(externalNullifier == roomId);

    //4.Check if messaged Signer = BackendAddress

    //5.Start flow
    createFlowFromContract(token, msg.sender, 38580246913580200);
  }

  // ACCOUNT LIST: add & delete accounts
  function addAccount(address _account) external {
    require(msg.sender == owner, "only owner can add accounts");
    daoMembers[_account] = true;
  }

  function addAccounts(address[] memory _accounts) external {
    require(msg.sender == owner, "only owner can add accounts");
    uint i = 0;
    while (i < _accounts.length) {
      daoMembers[_accounts[i]] = true;
      i++;
    }  
  }

  function removeAccount(address _account) external {
    require(msg.sender == owner, "only owner can remove accounts");
    daoMembers[_account] = false;
  }
  
  // FROM CONTRACT: create, delete
  function createFlowFromContract(ISuperfluidToken token, address receiver, int96 flowRate) internal {
    cfaV1.createFlow(receiver, token, flowRate);
  }

  function deleteFlowFromContract(ISuperfluidToken token, address receiver) external {
    // require(msg.sender == owner || daoMembers[msg.sender] == true, "must be authorized");
    cfaV1.deleteFlow(address(this), receiver, token);
  }

  // DEPOSIT: to this contract
  function sendLumpSumToContract(ISuperToken token, uint amount) external {
    require(msg.sender == owner ||daoMembers[msg.sender] == true, "must be authorized");
    token.transferFrom(msg.sender, address(this), amount);
  }

  // WITHDRAW: from account mapping to user address
  function withdrawFunds(ISuperToken token, uint amount) external {
    require(msg.sender == owner || daoMembers[msg.sender] == true, "must be authorized");
    token.transfer(msg.sender, amount);
  }
}