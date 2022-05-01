// contract test code will go here
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require("../compile");

let accounts;
let inbox;

beforeEach(async () => {
	// Get a list of all unlocked accounts
	accounts = await web3.eth.getAccounts();

	// Use one of those accounts to deploy contract
	inbox = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({
			data: bytecode,
			arguments: ["Hi there!"],
		})
		.send({
			from: accounts[0],
			gas: "1000000",
		})
});

describe("Inbox", () => {
	it("verifies the address", () => {
		console.log(inbox.options.address);
		assert.ok(inbox.options.address);
	});

	it("has a default message", async () => {
		const message = await inbox.methods.message().call();
		console.log(message)
		assert.equal(message, "Hi there!");
	})

	it("changes the message", async () => {
		await inbox.methods.setMessage("My name is Max").send({from: accounts[0]});
		const message = await inbox.methods.message().call();
		console.log(message);
		assert.equal(message, "My name is Max");
	})
});