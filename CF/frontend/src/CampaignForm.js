// import React, { useState } from "react";
// import { ethers } from 'ethers';

// const CampaignForm = ({ contract, account }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [target, setTarget] = useState("");
//   const [deadline, setDeadline] = useState("");
//   const [image, setImage] = useState("");

//   const createCampaign = async () => {
//     if (contract) {
//       const [day, month, year] = deadline.split('.'); // Assuming format DD.MM.YYYY
//       const deadlineTimestamp = Math.floor(new Date(`${year}-${month}-${day}`).getTime() / 1000); // Convert to Unix timestamp

//       const tx = await contract.createCampaign(
//         account,
//         title,
//         description,
//         ethers.parseEther(target),
//         deadlineTimestamp,
//         image
//       );
//       await tx.wait();
//       alert("Campaign created successfully!");
//     }
//   };

//   return (
//     <div className="mt-4">
//       <h2>Create New Campaign</h2>
//       <form>
//         <div className="form-group">
//           <label>Title</label>
//           <input
//             type="text"
//             className="form-control"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Description</label>
//           <textarea
//             className="form-control"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           ></textarea>
//         </div>
//         <div className="form-group">
//           <label>Target (ETH)</label>
//           <input
//             type="text"
//             className="form-control"
//             value={target}
//             onChange={(e) => setTarget(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Deadline</label>
//           <input
//             type="date"
//             className="form-control"
//             value={deadline}
//             onChange={(e) => setDeadline(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Image URL</label>
//           <input
//             type="text"
//             className="form-control"
//             value={image}
//             onChange={(e) => setImage(e.target.value)}
//           />
//         </div>
//         <button type="button" className="btn btn-primary" onClick={createCampaign}>
//           Create Campaign
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CampaignForm;

import React, { useState } from "react";
import { ethers } from 'ethers';

const CampaignForm = ({ contract, account, onError }) => { // add onError here
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [image, setImage] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const createCampaign = async () => {
    if (contract) {
      try {
        const [day, month, year] = deadline.split('.');
        const deadlineTimestamp = Math.floor(new Date(`${year}-${month}-${day}`).getTime() / 1000);

        setIsCreating(true);
        const tx = await contract.createCampaign(
          account,
          title,
          description,
          ethers.parseEther(target),
          deadlineTimestamp,
          image
        );
        await tx.wait();
        setSuccessMessage("Campaign created successfully!");
      } catch (error) {
        console.error("Error creating campaign:", error);
        onError("Failed to create campaign. Please try again.");
      }finally {
        setIsCreating(false); // End creating
      }
    } else {
      onError("Contract not available. Please connect MetaMask.");
    }
  };

  return (
    <div className="mt-4">
      <h2>Create New Campaign</h2>
      <form>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Target (ETH)</label>
          <input
            type="text"
            className="form-control"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Deadline</label>
          <input
            type="date"
            className="form-control"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div><br></br>
        <button type="button" className="btn btn-primary" onClick={createCampaign} disabled={isCreating}>
          
          {isCreating ? "Creating..." : "Create Campaign"}
        </button>
        {successMessage && (
        <div className="alert alert-success mt-3" role="alert">
          {successMessage}
        </div>
      )}
      </form>
      <br></br>
    </div>
    
  );
};

export default CampaignForm;

