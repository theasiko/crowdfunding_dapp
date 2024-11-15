import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css'
import CampaignForm from "./CampaignForm";
import CampaignList from "./CampaignList";
import Donate from "./Donate";
import Update from "./updateCampaign";
import Donators from "./getDonators";
// import contractABI from "./contractABI.json";
import contractABI from "./contractABI1.json"
//import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewMyDonations from "./ViewMyDonations";

const App = () => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [updatedCampaign, setUpdatedCampaign] = useState(null); // For storing updated campaign details
  const [errorMessage, setErrorMessage] = useState("");

  // const contractAddress = '0x1A381fdD321Dc3F68B271ae85E6c58630C57868a';
  const contractAddress = '0xd8d9038C0d6e001F03d0b98dAFeC81089f27943a';

  useEffect(() => {
    const initEthers = async () => {
      try {
        if (!window.ethereum) {
          console.log("MetaMask not installed; using read-only defaults");
          const provider = ethers.getDefaultProvider();
          setContract(new ethers.Contract(contractAddress, contractABI, provider));
          return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);

        const existingAccounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (existingAccounts.length > 0) {
          setAccount(existingAccounts[0]);
        } else {
          await provider.send("eth_requestAccounts", []);
          const signer = await provider.getSigner();
          setAccount(await signer.getAddress());
        }

        const contractInstance = new ethers.Contract(contractAddress, contractABI, await provider.getSigner());
        setContract(contractInstance);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        
        // Set appropriate error message based on the error code
        if (error.code === -32002) {
          setErrorMessage("Please check MetaMask for a pending connection request.");
        } else {
          setErrorMessage("Error connecting to MetaMask. Please try again.");
        }
      }
    };

    initEthers();
  }, []);

  // Fetch campaigns from the contract
  // const fetchCampaigns = async () => {
  //   if (contract) {
  //     const campaignsList = await contract.getCampaigns();
  //     setCampaigns(campaignsList);
  //   }
  // };
  const fetchCampaigns = async () => {
    if (contract) {
      try {
        const campaignsList = await contract.getCampaigns();
        setCampaigns(campaignsList);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setErrorMessage("Failed to load campaigns. Please check your network or Metamask.");
      }
    } else {
      setErrorMessage("Contract is not loaded. Please ensure MetaMask is connected to the correct network.");
    }
  };
  

  useEffect(() => {
    if (contract) {
      fetchCampaigns();

      // Listen for CampaignUpdated event
      contract.on("CampaignUpdated", (id, newTitle, newDescription, newDeadline, newImage) => {
        console.log("Campaign updated: ", { id, newTitle, newDescription, newDeadline, newImage });

        // Update state with new campaign details
        setUpdatedCampaign({
          id: id.toString(),
          newTitle,
          newDescription,
          newDeadline: new Date(newDeadline * 1000).toLocaleString(), // Convert UNIX timestamp to readable format
          newImage
        });

        fetchCampaigns();
      });
    }

    // Cleanup event listener when component unmounts
    return () => {
      if (contract) {
        contract.removeAllListeners("CampaignUpdated");
      }
    };
  }, [contract]);

  return (
    <div>
    
        <nav class="navbar bg-body-tertiary" data-bs-theme="dark">
          <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">Crowdfunding DApp</span>
          </div>
        </nav>
        <div class="background">
          <div class="background-content">
            <br></br><br></br><br></br>
            <div class="row">
              <div class="col">
              Crowdfunding is a modern way to raise funds by pooling small contributions from a large group of people. It has become a powerful tool for individuals, entrepreneurs, and organizations to turn ideas into reality. Whether you're supporting a social cause, launching a creative project, or building a groundbreaking product, crowdfunding empowers you to connect directly with supporters who believe in your vision.
              </div>
              <div class="col"></div>
            </div>
          </div> 
        </div>
      <div class="back">
        <div class="container">
<br></br>
      {errorMessage && (
        <div className="alert alert-warning mt-3">
          {errorMessage}
        </div>
      )}

      {/* <CampaignForm contract={contract} account={account} /> */}
      <ViewMyDonations contract={contract} />
      <CampaignForm contract={contract} account={account} onError={setErrorMessage} />
      <CampaignList campaigns={campaigns} contract={contract} />
      {/* <Donate contract={contract} /> */}
      <Update contract={contract} account={account} />
      {/* <Donators contract={contract} /> */}

      {/* Display updated campaign details */}
      {updatedCampaign && (
        <div className="alert alert-success mt-3">
          <h4>Campaign Updated</h4>
          {/* <p><strong>ID:</strong> {updatedCampaign.id}</p> */}
          <p><strong>Title:</strong> {updatedCampaign.newTitle}</p>
          <p><strong>Description:</strong> {updatedCampaign.newDescription}</p>
          <p><strong>New Deadline:</strong> {updatedCampaign.newDeadline}</p>
        </div>
      )}
      </div>
    </div>
    </div>
  );
};

export default App;