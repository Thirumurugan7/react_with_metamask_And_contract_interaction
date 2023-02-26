import { useState, useEffect } from "react";
import "./app.css";
import { ethers } from "ethers";
import logo from "./logo.svg";
import contractJson from "./contracts/contract.json";
import { hexValue } from "ethers/lib/utils";
// import Decrement from "./component/Decrement";
function App() {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const rprovider = new ethers.providers.JsonRpcProvider(
    "https://eth-goerli.g.alchemy.com/v2/2YzPHtIi1MgTChTPqcmG2iJ-z_0FjXxa"
  );

  //   const contractabi = contractJson.abi;
  //   console.log(contractabi);
  const contractAddress = "0x029AE22064E7C53a5fc2784e38969881a34b2Fd0";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractJson, signer);
  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");

  const [isConnected, setIsConnected] = useState(false);

  const { ethereum } = window;

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);

      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  async function increment() {
    const increase = await contract.increment();
    console.log(increase);
    const show_1 = await contract.show_1();
    console.log(show_1.toString());
    const hexValue = show_1;

    const byteValue = ethers.utils.arrayify(hexValue);
    const stringValue = ethers.utils.toUtf8String(byteValue);
    console.log(stringValue);
    return <div>increase.toString(data)</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        {haveMetamask ? (
          <div className="App-header">
            {isConnected ? (
              <div className="card">
                <div className="card-row">
                  <h3>Wallet Address:</h3>
                  <p>
                    {accountAddress.slice(0, 4)}...
                    {accountAddress.slice(38, 42)}
                  </p>
                </div>
                <div className="card-row">
                  <h3>Wallet Balance:</h3>
                  <p>{accountBalance}</p>
                </div>
              </div>
            ) : (
              <img src={logo} className="App-logo" alt="logo" />
            )}

            {isConnected ? (
              <p className="info">🎉 Connected Successfully</p>
            ) : (
              <button className="btn" onClick={connectWallet}>
                Connect
              </button>
            )}
          </div>
        ) : (
          <p>Please Install MataMask</p>
        )}
      </header>
      <div>
        <button className="vishal" onClick={increment}>
          Increment {}
        </button>
      </div>
    </div>
  );
}

export default App;
