// SPDX-License-Identifier: AGPLv3
pragma solidity ^0.8.0;
import {Proxy} from "@openzeppelin/contracts/proxy/Proxy.sol";

contract UUPSProxy is Proxy {
	error ZeroAddress();
	error Initialized();

	bytes32 internal constant _IMPLEMENTATION_SLOT = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;

	function initializeProxy(address initialAddress) external {
		if (initialAddress == address(0)) revert ZeroAddress();
		if (_implementation() != address(0)) revert Initialized();
		assembly {
			sstore(_IMPLEMENTATION_SLOT, initialAddress)
		}
	}

	function _implementation()
		internal
		view
		virtual
		override
		returns (address impl)
	{
		assembly {
			impl := sload(_IMPLEMENTATION_SLOT)
		}
	}
}