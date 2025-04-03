pragma solidity ^0.8.0;

contract Voting {
    mapping(address => bool) public voters;
    mapping(string => uint) public votes;

    function vote(string memory candidate) public {
        require(!voters[msg.sender], "Already voted");
        voters[msg.sender] = true;
        votes[candidate]++;
    }
}

