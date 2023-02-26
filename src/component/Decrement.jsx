import React from "react";
import { ethers } from "ethers";
import contractJson from "../contracts/contract.json";
const Decrement = () => {
  const contractAddress = "0x029AE22064E7C53a5fc2784e38969881a34b2Fd0";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractJson, signer);
  async function decrement() {
    const decrease = await contract.increment();
    console.log(decrease);
    return <div>{decrease.data.toString()}</div>;
  }
  return { decrement };
};

export default Decrement;
