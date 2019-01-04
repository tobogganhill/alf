//const JohnnyDapp = artifacts.require("./JohnnyDapp.sol");
const ArtistsLiberationFront = artifacts.require("./ArtistsLiberationFront.sol");

module.exports = function(deployer, network) {
  // OpenSea proxy registry addresses for rinkeby and mainnet.
  let proxyRegistryAddress = "";
  if (network === 'rinkeby') {
    proxyRegistryAddress = "0xf57b2c51ded3a29e6891aba85459d600256cf317";
  } else if (network === 'live') {
    proxyRegistryAddress = "0xa5409ec958c83c3f309868babaca7c86dcb077c1";
  }

  //deployer.deploy(JohnnyDapp, proxyRegistryAddress, {gas: 5000000});
  deployer.deploy(ArtistsLiberationFront, proxyRegistryAddress, {gas: 5000000});
};