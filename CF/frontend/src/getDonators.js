// import React, { useState, useEffect } from 'react';

// const Donators = ({ contract, campaignId }) => {
//   const [donators, setDonators] = useState([]);
//   const [donations, setDonations] = useState([]);

//   useEffect(() => {
//     const fetchDonators = async () => {
//       if (contract && campaignId !== null) {
//         try {
//           const [donatorAddresses, donationAmounts] = await contract.getDonators(campaignId);
//           setDonators(donatorAddresses);
//           setDonations(donationAmounts);
//         } catch (error) {
//           console.error("Error fetching donators:", error);
//         }
//       }
//     };

//     fetchDonators();
//   }, [contract, campaignId]);

//   return (
//     <div>
//       <h4>Donators List for Campaign ID: {campaignId}</h4>
//       <ul>
//         {donators.map((donator, index) => (
//           <li key={index}>
//             {donator} donated {donations[index].toString()} wei
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Donators;


// import React, { useState, useEffect } from 'react';
// import { ethers } from 'ethers';

// const Donators = ({ contract, campaignId }) => {
//   const [donators, setDonators] = useState([]);
//   const [donations, setDonations] = useState([]);

//   useEffect(() => {
//     const fetchDonators = async () => {
//       if (contract && campaignId !== null) {
//         try {
//           const [donatorAddresses, donationAmounts] = await contract.getDonators(campaignId);
//           setDonators(donatorAddresses);
//           // Convert each donation amount from wei to ETH
//           const donationAmountsInEth = donationAmounts.map(amount => ethers.formatUnits(amount, 'ether'));
//           setDonations(donationAmountsInEth);
//         } catch (error) {
//           console.error("Error fetching donators:", error);
//         }
//       }
//     };

//     fetchDonators();
//   }, [contract, campaignId]);

//   return (
//     <div>
//       <h4>Donators List for Campaign ID: {campaignId}</h4>
//       <ul>
//         {donators.map((donator, index) => (
//           <li key={index}>
//             {donator} donated {donations[index]} ETH
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Donators;



import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Donators = ({ contract, campaignId }) => {
  const [donators, setDonators] = useState([]);
  const [donations, setDonations] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  

  useEffect(() => {
    const fetchDonators = async () => {
      if (contract && campaignId !== null) {
        try {
          console.log(`Fetching donators for campaign ID: ${campaignId}`); // Log the campaign ID
          const [donatorAddresses, donationAmounts] = await contract.getDonators(campaignId);

          if (donatorAddresses.length === 0) {
            setErrorMessage("No donators yet for this campaign.");
          } else {
            setDonators(donatorAddresses);
            const donationAmountsInEth = donationAmounts.map(amount => ethers.formatUnits(amount, 'ether'));
            setDonations(donationAmountsInEth);
            setErrorMessage(""); // Clear any previous error message
          }
        } catch (error) {
          console.error("Error fetching donators:", error);
          setErrorMessage("Failed to load donators. Please check your network or contract.");
        }
      }
    };

    fetchDonators();
  }, [contract, campaignId]);

  return (
    <div>
      <h4>Donators List for Campaign ID: {campaignId}</h4>

      {/* Display error message if there's an issue fetching donators */}
      {errorMessage && (
        <div className="alert alert-warning mt-3">
          {errorMessage}
        </div>
      )}

      {/* Display list of donators if available */}
      <ul>
        {donators.map((donator, index) => (
          <li key={index}>
            {donator} donated {donations[index]} ETH
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Donators;


// import React, { useState } from 'react';

// const Donators = ({ contract }) => {
//   const [campaignId, setCampaignId] = useState('');
//   const [donators, setDonators] = useState([]);
//   const [donations, setDonations] = useState([]);

//   const fetchDonators = async () => {
//     if (contract) {
//       try {
//         const [donatorAddresses, donationAmounts] = await contract.getDonators(campaignId);
//         setDonators(donatorAddresses);
//         setDonations(donationAmounts);
//       } catch (error) {
//         console.error(error);
//         alert('Error fetching donators');
//       }
//     }
//   };

//   return (
//     <div className="mt-5">
//       <h3>Get Donators</h3>
//       <input 
//         type="number" 
//         placeholder="Campaign ID" 
//         className="form-control mb-2"
//         value={campaignId} 
//         onChange={(e) => setCampaignId(e.target.value)} 
//       />
//       <button className="btn btn-primary" onClick={fetchDonators}>Fetch Donators</button>

//       <h4>Donators List</h4>
//       <ul>
//         {donators.map((donator, index) => (
//           <li key={index}>
//             {donator} donated {donations[index].toString()} wei
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Donators;





// import React, { useState, useEffect } from 'react';
// import { ethers } from 'ethers';

// const Donators = ({ contract, campaignId }) => {
//   const [donators, setDonators] = useState([]);
//   const [donations, setDonations] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     const fetchDonators = async () => {
//       if (contract && campaignId) {
//         try {
//           console.log(`Fetching donators for campaign ID: ${campaignId}`);
//           const [donatorAddresses, donationAmounts] = await contract.getDonators(campaignId);

//           if (donatorAddresses.length === 0) {
//             setErrorMessage("No donators yet for this campaign.");
//           } else {
//             setDonators(donatorAddresses);
//             const donationAmountsInEth = donationAmounts.map(amount => ethers.formatUnits(amount, 'ether'));
//             setDonations(donationAmountsInEth);
//             setErrorMessage(""); // Clear any previous error message
//           }
//         } catch (error) {
//           console.error("Error fetching donators:", error);
//           setErrorMessage("Failed to load donators. Please check your network or Metamask.");
//         }
//       } else {
//         console.warn("Contract or campaignId is undefined");
//       }
//     };

//     fetchDonators();
//   }, [contract, campaignId]);

//   return (
//     <div>
//       <h4>Donators List for Campaign ID: {campaignId}</h4>

//       {errorMessage && (
//         <div className="alert alert-warning mt-3">
//           {errorMessage}
//         </div>
//       )}

//       <ul>
//         {donators.map((donator, index) => (
//           <li key={index}>
//             {donator} donated {donations[index]} ETH
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Donators;