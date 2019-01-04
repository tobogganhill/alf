const HDWalletProvider = require("truffle-hdwallet-provider");
const web3 = require('web3');
const MNEMONIC = process.env.MNEMONIC;
const INFURA_KEY = process.env.INFURA_KEY;
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS;
const OWNER_ADDRESS = process.env.OWNER_ADDRESS;
const NETWORK = process.env.NETWORK;
const METADATA_ADDRESS = "https://ipfs.io/ipfs/Qmchtaf3sxTuuaKQKdPgmWKBHaZJrKGhvuErifzASPUxXm";

if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !NETWORK) {
    console.error("Please set a mnemonic, infura key, owner, network, and tokenContract address.");
    return
}

const NFT_ABI = [{
    "constant": false,
    "inputs": [
        {
            "name": "_to",
            "type": "address"
        },
        {
            "name": "_tokenURI",
            "type": "string"
        }
    ],
    "name": "mint",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}];

async function main() {
    const web3Instance = new web3(
        new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/${INFURA_KEY}`)
    );

    if (NFT_CONTRACT_ADDRESS) {
        const nftContract = new web3Instance.eth.Contract(NFT_ABI, NFT_CONTRACT_ADDRESS, { gasLimit: "1000000" });

        // Creatures issued directly to the owner.
        const result = await nftContract.methods.mint(OWNER_ADDRESS, METADATA_ADDRESS).send({ from: OWNER_ADDRESS });
        console.log(result.transactionHash);
    }
}

main();