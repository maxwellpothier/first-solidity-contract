// deploy code will go here
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const {interface, bytecode} = require("./compile");

const provider = new HDWalletProvider(
	"note clean thought average radar glare mountain blame enroll monitor reunion produce",
	"https://rinkeby.infura.io/v3/65a09458f8194cd1bf68866e8a854360",
);

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	console.log("Attempting to deploy from account: ", accounts[0]);

	const result = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({
			data: bytecode,
			arguments: ["My name is Max."],
		})
		.send({
			gas: "1000000",
			from: accounts[0],
		});


	console.log("Contract deployed to ", result.options.address);
	provider.engine.stop();
};

deploy();