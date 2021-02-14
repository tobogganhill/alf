const HDWalletProvider = require('truffle-hdwallet-provider');
const MNEMONIC = process.env.MNEMONIC;
const INFURA_KEY = process.env.INFURA_KEY;

if (!MNEMONIC || !INFURA_KEY) {
	console.error('Please set a mnemonic and infura key.');
	return;
}

module.exports = {
	networks: {
		development: {
			provider: function() {
				return new HDWalletProvider(MNEMONIC, 'http://localhost:8545');
			},
			gas: 4600000,
			network_id: '*', // Match any network id
		},
		rinkeby: {
			provider: function() {
				return new HDWalletProvider(
					MNEMONIC,
					'https://rinkeby.infura.io/' + INFURA_KEY
				);
			},
			network_id: 4,
			gas: 6712390,
		},
		live: {
			network_id: 1,
			provider: function() {
				return new HDWalletProvider(
					MNEMONIC,
					'https://mainnet.infura.io/' + INFURA_KEY
				);
			},
			gas: 4000000,
			gasPrice: 60000000000,
		},
		mocha: {
			reporter: 'eth-gas-reporter',
			reporterOptions: {
				currency: 'USD',
				gasPrice: 2,
			},
		},
		compilers: {
			solc: {
				version: '0.5.0',
			},
		},
	},
};
