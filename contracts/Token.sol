// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {IERC20MintableBurnable} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IERC20MintableBurnable.sol";
import "@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol";
import {ERC20} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/test/ERC20.sol";
contract Token is ERC20, IERC20MintableBurnable {
    
    constructor() IERC20MintableBurnable() ERC20("ABC Token", "ABC", 18){
    }

    function give(uint256 amount) external {
        _mint(msg.sender, amount);
    }

    function burn(address account, uint256 amount) external override {
        _approve(account, msg.sender, allowance[account][msg.sender] - amount);
        _burn(account, amount);
    }

    function mint(address account, uint256 amount) external {
        _mint(account, amount);
    }

}
