import React, { useState } from "react";
import Modal from "./Modal";
import { ethers } from "ethers";

const ViewMyDonations = ({ contract }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donatedCampaigns, setDonatedCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isViewing, setIsViewing] = useState(false);

  const handleFetchDonations = async () => {
    try {
      setLoading(true);
      setIsViewing(true);
      const campaigns = await contract.getMyDonatedCampaigns();
      setDonatedCampaigns(campaigns);
    } catch (error) {
      console.error("Error fetching donated campaigns:", error);
    } finally {
      setLoading(false);
      setIsModalOpen(true);
      setIsViewing(false);
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={handleFetchDonations} disabled={isViewing}>
        {isViewing ? "Loading..." : "View My Donations"}
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : donatedCampaigns.length > 0 ? (
          <ul className="list-group">
            {donatedCampaigns.map((campaign, index) => (
              <li key={index} className="list-group-item">
                <h5>{campaign.title}</h5>
                <p>{campaign.description}</p>
                <p>
                  <strong>Target:</strong> {ethers.formatEther(campaign.target)} ETH
                </p>
                <p>
                  <strong>Amount Collected:</strong>{" "}
                  {ethers.formatEther(campaign.amountCollected)} ETH
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center">You have not donated to any campaigns.</div>
        )}
      </Modal>
    </>
  );
};

export default ViewMyDonations;


// import React, { useState, useEffect } from "react";
// import Modal from "./Modal";
// const ethers = require("ethers");

// const ViewMyDonations = ({ contract }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [donatedCampaigns, setDonatedCampaigns] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [userDonationAmounts, setUserDonationAmounts] = useState({});

//   // Fetch the user’s donation amount for each campaign
//   const handleFetchDonations = async () => {
//     try {
//         setLoading(true);
//         const campaigns = await contract.getMyDonatedCampaigns();
//         setDonatedCampaigns(campaigns);

//       // Iterate through each campaign and fetch donators and their donations
//       const campaignsWithUserDonations = await Promise.all(
//         campaigns.map(async (campaign) => {
//           const [donatorAddresses, donationAmounts] = await contract.getDonators(campaign.id);

//           // Find the donation amount of the current user
//           const userDonationIndex = donatorAddresses.indexOf(userAddress);
//           const userDonationAmount = userDonationIndex !== -1 ? donationAmounts[userDonationIndex] : 0;

//           // Format the donation amount to ether
//           const formattedUserDonationAmount = ethers.formatUnits(userDonationAmount, 'ether');

//           // Return the campaign with the user's donation amount included
//           return {
//             ...campaign,
//             userDonationAmount: formattedUserDonationAmount
//           };
//         })
//       );

//       setDonatedCampaigns(campaignsWithUserDonations);
//     } catch (error) {
//       console.error("Error fetching donated campaigns:", error);
//     } finally {
//       setLoading(false);
//       setIsModalOpen(true);
//     }
//   };

//   return (
//     <>
//       <button className="btn btn-primary" onClick={handleFetchDonations}>
//         View My Donations
//       </button>

//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         {loading ? (
//           <div className="text-center">Loading...</div>
//         ) : donatedCampaigns.length > 0 ? (
//           <ul className="list-group">
//             {donatedCampaigns.map((campaign, index) => (
//               <li key={index} className="list-group-item">
//                 <h5>{campaign.title}</h5>
//                 <p>{campaign.description}</p>
//                 <p>
//                   <strong>Target:</strong> {ethers.formatEther(campaign.target)} ETH
//                 </p>
//                 <p>
//                   <strong>Amount Collected:</strong>{" "}
//                   {ethers.formatEther(campaign.amountCollected)} ETH
//                 </p>
//                 <p>
//                   <strong>Your Donation:</strong> {campaign.userDonationAmount} ETH
//                 </p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <div className="text-center">You have not donated to any campaigns.</div>
//         )}
//       </Modal>
//     </>
//   );
// };

// export default ViewMyDonations;



// import React, { useState, useEffect } from "react";
// import Donators from "./getDonators";

// const ViewMyDonations = ({ contract }) => {
//   const [campaignId, setCampaignId] = useState(null); // State to select the campaign ID
//   const [campaigns, setCampaigns] = useState([]); // Store the list of campaigns
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     const fetchCampaigns = async () => {
//       if (contract) {
//         try {
//           const campaignsList = await contract.getCampaigns();
//           setCampaigns(campaignsList);
//         } catch (error) {
//           console.error("Error fetching campaigns:", error);
//           setErrorMessage("Failed to load campaigns. Please check your network or Metamask.");
//         }
//       }
//     };

//     fetchCampaigns();
//   }, [contract]);

//   return (
//     <div>
//       <h3>View My Donations</h3>
//       {errorMessage && <div className="alert alert-warning">{errorMessage}</div>}
//       <div>
//         <label htmlFor="campaignSelect">Select Campaign:</label>
//         <select
//           id="campaignSelect"
//           onChange={(e) => setCampaignId(e.target.value)}
//           value={campaignId || ""}
//         >
//           <option value="" disabled>
//             Choose a campaign
//           </option>
//           {campaigns.map((campaign, index) => (
//             <option key={index} value={index}>
//               {campaign.title || `Campaign #${index + 1}`}
//             </option>
//           ))}
//         </select>
//       </div>
//       {campaignId !== null && (
//         <Donators contract={contract} campaignId={campaignId} />
//       )}
//     </div>
//   );
// };

// export default ViewMyDonations;
