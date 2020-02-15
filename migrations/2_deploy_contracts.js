const PunkPrintRegistry = artifacts.require("PunkPrintRegistry");
const PunkPrintRegistryMinter = artifacts.require("PunkPrintRegistryMinter");

module.exports = function(deployer) {
 deployer.deploy(PunkPrintRegistry, "0xA07716Cfa56785c0e4ECA7F5f086E0F1D09CD1C7" , "100000000000000000", "100000000000000000", "100000000000000000", "100000000000000000", "100000000000000000", "100000000000000000", "","","");
 deployer.deploy(PunkPrintRegistryMinter, "0x89447f2Ca722481d1399ae08b4d7E9471883F6c8", "0xcB62A94aFcd4Ff4498BE912DFbF60Ca1d4B3edDc", "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB");
};
