// import React, { useState } from "react";
// import { ethers } from 'ethers';

// const Donate = ({ contract }) => {
//   const [amount, setAmount] = useState("");
//   const [campaignId, setCampaignId] = useState("");

//   const donateToCampaign = async () => {
//     if (contract) {
//       const tx = await contract.donateToCampaign(campaignId, {
//         value: ethers.parseEther(amount),
//       });
//       await tx.wait();
//       alert("Donation successful!");
//     }
//   };

//   return (
//     <div className="mt-5">
//       <h2>Donate to a Campaign</h2>
//       <input
//         type="text"
//         placeholder="Campaign ID"
//         className="form-control mb-2"
//         value={campaignId}
//         onChange={(e) => setCampaignId(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Amount in ETH"
//         className="form-control mb-2"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />
//       <button className="btn btn-primary" onClick={donateToCampaign}>
//         Donate
//       </button>
//     </div>
//   );
// };

// export default Donate;




// import React, { useState } from "react";
// import { ethers } from 'ethers';

// const Donate = ({ contract }) => {
//   const [amount, setAmount] = useState("");
//   const [campaignId, setCampaignId] = useState("");
//   const [isDonating, setIsDonating] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const donateToCampaign = async () => {
//     if (contract && amount && campaignId) {
//       setIsDonating(true);
//       setSuccessMessage(""); // Clear any previous success messages

//       try {
//         const tx = await contract.donateToCampaign(campaignId, {
//           value: ethers.parseEther(amount),
//         });
//         await tx.wait();
//         setSuccessMessage("Donation successful! Thank you for your support!"); // Set success message
//       } catch (error) {
//         console.error("Error donating to campaign:", error);
//         alert("Donation failed. Please try again.");
//       } finally {
//         setIsDonating(false);
//       }
//     } else {
//       alert("Please enter a valid campaign ID and amount.");
//     }
//   };

//   return (
//     <div className="mt-5">
//       <h2>Donate to a Campaign</h2>
//       <input
//         type="text"
//         placeholder="Campaign ID"
//         className="form-control mb-2"
//         value={campaignId}
//         onChange={(e) => setCampaignId(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Amount in ETH"
//         className="form-control mb-2"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />
//       <button
//         className="btn btn-primary"
//         onClick={donateToCampaign}
//         disabled={isDonating} // Disable button while donating
//       >
//         {isDonating ? "Donating..." : "Donate"} {/* Change button text */}
//       </button>
//       {successMessage && (
//         <div className="alert alert-success mt-3" role="alert">
//           {successMessage} {/* Display success message */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Donate;



// import React, { useState } from "react";
// import { ethers } from 'ethers';

// const Donate = ({ contract, campaignId }) => {
//   const [amount, setAmount] = useState("");

//   const donateToCampaign = async () => {
//     console.log("Contract:", contract); // Check if contract is defined
//     console.log("Campaign ID:", campaignId); // Log the campaign ID
//     console.log("Amount:", amount); // Log the amount entered
//     if (contract && campaignId !== "") {
//       try {
//         const parsedAmount = ethers.parseEther(amount); // Convert amount to Wei

//         // Validate the amount
//         if (parsedAmount===0) {
//           alert("Please enter an amount greater than 0.");
//           return;
//         }

//         const tx = await contract.donateToCampaign(campaignId, {
//           value: parsedAmount,
//         });
//         await tx.wait(); // Wait for the transaction to be mined
//         alert("Donation successful!");
//         setAmount(""); // Clear the input after a successful donation
//       } catch (error) {
//         console.error("Error during donation:", error);
//         alert("Donation failed! " + error.message);
//       }
//     } else {
//       alert("Please enter a valid amount and select a campaign.");
//     }
//   };

//   return (
//     <div className="mt-5">
//       <h2>Donate to Campaign ID: {campaignId}</h2>
//       <input
//         type="text"
//         placeholder="Amount in ETH"
//         className="form-control mb-2"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />
//       <button className="btn btn-primary" onClick={donateToCampaign}>
//         Donate
//       </button>
//     </div>
//   );
// };

// export default Donate;

// 



// import React, { useState } from "react";
// import { ethers } from 'ethers';

// const Donate = ({ contract, campaignId }) => {
//   const [amount, setAmount] = useState("");
//   const [isDonating, setIsDonating] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const donateToCampaign = async () => {
//     console.log("Contract:", contract);
//     console.log("Campaign ID:", campaignId);
//     console.log("Amount:", amount);

//     if (contract && campaignId !== "") {
//       try {
//         const parsedAmount = ethers.parseEther(amount); // Convert amount to Wei

//         // Validate the amount
//         if (parsedAmount===0) {
//           alert("Please enter an amount greater than 0.");
//           return;
//         }
//         if (parsedAmount<0) {
//           alert("Please enter an amount greater than 0.");
//           return;
//         }

//         setIsDonating(true); // Start donation
//         const tx = await contract.donateToCampaign(campaignId, {
//           value: parsedAmount,
//         });
//         await tx.wait(); // Wait for the transaction to be mined
//         setSuccessMessage("Donation successful!");
//         setAmount(""); // Clear the input after a successful donation
//       } catch (error) {
//         console.error("Error during donation:", error);
//         alert("Donation failed! " + error.message);
//       } finally {
//         setIsDonating(false); // End donation
//       }
//     } else {
//       alert("Please enter a valid amount.");
//     }
//   };

//   return (
//     <div className="mt-5">
//       <input
//         type="text"
//         placeholder="Amount in ETH"
//         className="form-control mb-2"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />
//       <button
//         className="btn btn-primary"
//         onClick={donateToCampaign}
//         disabled={isDonating} // Disable button while donating
//       >
//         {isDonating ? "Donating..." : "Donate"}
//       </button>
//       {successMessage && (
//         <div className="alert alert-success mt-3" role="alert">
//           {successMessage}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Donate;


// import React, { useState } from "react";
// import { ethers } from 'ethers';

// const Donate = ({ contract, campaignId }) => {
//   const [amount, setAmount] = useState("");
//   const [isDonating, setIsDonating] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const donateToCampaign = async () => {
//     console.log("Contract:", contract);
//     console.log("Campaign ID:", campaignId);
//     console.log("Amount:", amount);

//     if (contract && campaignId) {
//       try {
//         const parsedAmount = ethers.parseEther(amount); // Convert amount to Wei

//         // Validate the amount
//         if (parsedAmount.isZero()) {
//           alert("Please enter an amount greater than 0.");
//           return;
//         }

//         setIsDonating(true); // Start donation
//         const tx = await contract.donateToCampaign(campaignId, {
//           value: parsedAmount,
//         });
//         await tx.wait(); // Wait for the transaction to be mined
//         setSuccessMessage("Donation successful!");
//         setAmount(""); // Clear the input after a successful donation
//       } catch (error) {
//         console.error("Error during donation:", error);
//         alert("Donation failed! " + error.message);
      // } finally {
      //   setIsDonating(false); // End donation
      // }
//     } else {
//       alert("Please enter a valid amount.");
//     }
//   };

//   return (
//     <div className="mt-5">
//       <input
//         type="text"
//         placeholder="Amount in ETH"
//         className="form-control mb-2"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />
      // <button
      //   className="btn btn-primary"
      //   onClick={donateToCampaign}
      //   disabled={isDonating} // Disable button while donating
      // >
      //   {isDonating ? "Donating..." : "Donate"}
      // </button>
      // {successMessage && (
      //   <div className="alert alert-success mt-3" role="alert">
      //     {successMessage}
      //   </div>
      // )}
//     </div>
//   );
// };

// export default Donate;


import React, { useState } from "react";
import { ethers } from 'ethers';

const Donate = ({ contract, campaignId }) => {
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDonating, setIsDonating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const donateToCampaign = async () => {
    console.log("Contract:", contract); // Check if contract is defined
    console.log("Campaign ID:", campaignId); // Log the campaign ID
    console.log("Amount:", amount); // Log the amount entered

    if (contract && campaignId !== null && amount) { // Ensure campaignId and amount are valid
      try {
        // Log available methods to ensure donateToCampaign exists
        console.log("Available methods:", Object.keys(contract));
        console.log("Donate To Campaign Method:", contract.donateToCampaign); // Check if this is defined

        const parsedAmount = ethers.parseEther(amount); // Convert amount to Wei

        // Validate the amount
        if (parsedAmount===0) {
          setErrorMessage("Please enter an amount greater than 0.");
          return;
        }

        setIsDonating(true);
        const tx = await contract.donateToCampaign(campaignId, {
          value: parsedAmount,
        });
        console.log("Transaction:", tx); // Log the transaction object

        await tx.wait(); // Wait for the transaction to be mined
        setSuccessMessage("Donation successful!");
        setAmount(""); // Clear the input after a successful donation
      } catch (error) {
        console.error("Error during donation:", error);
        setErrorMessage("Donation failed. Please check your network or Metamask.");
        // alert("Donation failed! " + error.message);
      } finally {
        setIsDonating(false); // End donation
      }
    } else {
      setErrorMessage("Please enter a valid amount and select a campaign.");
    }
  };

  return (
    <div className="mt-5">
      <h2>Donate to Campaign: {campaignId}</h2>
      <input
        type="text"
        placeholder="Amount in ETH"
        className="form-control mb-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        className="btn btn-primary"
        onClick={donateToCampaign}
        disabled={isDonating} // Disable button while donating
      >
        {isDonating ? "Donating..." : "Donate"}
      </button>
      {successMessage && (
        <div className="alert alert-success mt-3" role="alert">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-warning mt-3">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Donate;