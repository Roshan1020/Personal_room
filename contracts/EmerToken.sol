// SPDX-License-Identifier: AGPLv3
pragma solidity ^0.8.13;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {SuperTokenBase} from "./base/SuperTokenBase.sol";

contract EmerToken is SuperTokenBase, Ownable {
    function initialize(string memory name, string memory symbol, address factory) external {
        _initialize(name, symbol, factory);
    }

	function mint(address receiver, uint256 amount, bytes memory userData) external onlyOwner {
		_mint(receiver, amount, userData);
	}
}