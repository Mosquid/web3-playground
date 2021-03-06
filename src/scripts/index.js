const ABI = require("./ABI.json");
const { attachTansactionHandlers } = require("./transactions");
let contract;

const contractAddress = "0xE3fD304704ae2599970Eb0b7b2b9BC672b3A0eB6";

async function loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
  }
}

async function loadContract() {
  return await new window.web3.eth.Contract(ABI, contractAddress);
}

async function updateRecord() {
  const record = document.getElementById("record");
  const theLastOne = await contract.methods.greetLastPerson().call();

  record.innerText = theLastOne;
}

async function handleNameChange(e) {
  const name = e.target.value;
  try {
    const [account] = await web3.eth.getAccounts();
    const emitter = contract.methods
      .setWhoToGreet(name)
      .send({ from: account });

    attachTansactionHandlers(emitter);
  } catch (error) {}
}

async function main() {
  document.getElementById("name").addEventListener("change", handleNameChange);

  await loadWeb3();

  contract = await loadContract();

  await updateRecord();
}

main();
