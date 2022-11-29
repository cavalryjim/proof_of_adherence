pragma solidity >= 0.5.0 < 0.6.0;

import "github.com/provable-things/ethereum-api/provableAPI.sol";

contract planAdherence is usingProvable {

    bool public adherence;

    event LogNewPlanAdherence(bool adherence);
    event LogNewProvableQuery(string description);

    constructor()
        public
    {
        update(); // First check at contract creation...
    }

    function __callback(
        bytes32 _myid,
        string memory _result
    )
        public
    {
        require(msg.sender == provable_cbAddress());
        emit LogNewPlanAdherence(_result);
        adherence = bool(_result); 
        // Now do something with the result
    }

    function update()
        public
        payable
    {
        emit LogNewProvableQuery("Provable query was sent, standing by for the answer...");
        provable_query("URL", "json(https://healthengagements.com).planAdherence.response");
    }
}
