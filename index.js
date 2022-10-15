import { ethers } from "./ethers.esm.min.js";
import { abi, contractAddress } from "./constants.js";
const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fund");
const balanceButton = document.getElementById("balanceButton");
const withdrawButton = document.getElementById("withdrawButton");
balanceButton.onclick = getBalance;
connectButton.onclick = connect;
fundButton.onclick = fund;
withdrawButton.onclick = withDraw;
console.log(ethers);
async function connect() {
  if (typeof window.ethreum !== undefined) {
    console.log("Metamask is here");
    await window.ethereum.request({ method: "eth_requestAccounts" });
    document.getElementById("connectButton").innerHTML = "Connected";
  } else {
    console.log("no metamask!");
  }
}

//fund function
async function fund() {
  const ethAmount = document.getElementById("ethAmount").value;
  console.log(`funding with ${ethAmount}`);
  if (typeof window.ethreum !== undefined) {
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  try {
    const transcationResponse = await contract.fund({
      value: ethers.utils.parseEther(ethAmount.toString()),
    });
    await listenForTransactionMine(transcationResponse, provider);
  } catch (error) {
    console.log(error);
  }
}

function listenForTransactionMine(transcationResponse, provider) {
  console.log(`mining ${transactionResponse.hash}...`);
  provider.once(transcationResponse.hash, (transactionReceipt) => {
    console.log(`completed with ${transactionReceipt.confirmations}`);
  });
  return new Promise();
}
async function getBalance() {
  if (typeof window.ethereum != "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(contractAddress);
    console.log(ethers.utils.formatEther(balance));
  }
}
//withdraw function

async function withDraw() {
  if (typeof window.ethereum != "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.withdraw();
      await listenForTranscationMine(transactionResponse, provider);
    } catch (error) {}
  }
}
