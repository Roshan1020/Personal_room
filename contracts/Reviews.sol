//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

contract Reviews {
  address owner;

  constructor() {
    owner = msg.sender;
  }

  // FULL LENGTH COMMENTS
  mapping(address => mapping(uint256 => string)) userComments;
  mapping(address => uint256[]) userIndex;

  function addUserComment(address user, string memory userComment) external returns (uint256) {
    if (userIndex[user].length == 0) {
      userIndex[user].push(0);
    }
    uint256 id = userIndex[user].length;
    userIndex[user].push(id);
    userComments[user][id] = userComment;
    return id;
  }

  function lookupUserComment(address user, uint256 id) external view returns (string memory) {
    return userComments[user][id];
  }

  ///////////////////// NOT IN USE
  // HASHED COMMENTS
  mapping(address => mapping(bytes32 => bytes32)) hashedUserComments;
  uint256 salt;

  function addHashedUserComment(address user, string memory userComment) external returns (bytes32) {
    bytes32 id = keccak256(abi.encodePacked(user, salt));
    bytes32 hashedComment = keccak256(abi.encodePacked(userComment));
    hashedUserComments[user][id] = hashedComment;
    salt = salt + 1;
    return id;
  }

  function lookupHashedUserComment(address user, bytes32 id) external view returns (bytes32) {
    return hashedUserComments[user][id];
  }
}