// SPDX-License-Identifier: AGPLv3
pragma solidity ^0.8.13;

import {SuperTokenStorage} from "../utils/SuperTokenStorage.sol";
import {UUPSProxy} from "../utils/UUPSProxy.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";
import {ISuperTokenFactory} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperTokenFactory.sol";

abstract contract SuperTokenBase is SuperTokenStorage, UUPSProxy {
	function _initialize(string memory name, string memory symbol, address factory) internal {
		ISuperTokenFactory(factory).initializeCustomSuperToken(address(this));
		ISuperToken(address(this)).initialize(IERC20(address(0)), 18, name, symbol);
	}

	function _totalSupply() internal view returns (uint256 t) {
		return ISuperToken(address(this)).totalSupply();
	}

	function _mint(address account, uint256 amount, bytes memory userData) internal {
		ISuperToken(address(this)).selfMint(account, amount, userData);
	}

	function _burn(address from, uint256 amount, bytes memory userData) internal {
		ISuperToken(address(this)).selfBurn(from, amount, userData);
	}

	function _approve(address account, address spender, uint256 amount) internal {
		ISuperToken(address(this)).selfApproveFor(account, spender, amount);
	}

	function _transferFrom(
		address holder,
		address spender,
		address recipient,
		uint256 amount
	) internal {
		ISuperToken(address(this)).selfTransferFrom(holder, spender, recipient, amount);
	}
}