// /* eslint-env es2020 */
// import React from "react";
// import { ethers } from 'ethers';
// import Donate from './Donate';


// const CampaignList = ({ campaigns }) => {
//   return (
//     <div>
//       <h3>All Campaigns</h3>
      
//       {campaigns.map((campaign, index) => (
//         <div key={index}>
          
//           <h4>{campaign.title}</h4>
//           <p><strong>Campaign ID: {index}</strong></p> {/* Display Campaign ID */}
//           <p>Description: {campaign.description}</p>
//           {/* Convert BigInt to string for rendering */}
//           <p>Target: {ethers.formatUnits(campaign.target.toString(), 'ether')} ETH</p>
//           <p>
//             Deadline: {new Date(Number(campaign.deadline) * 1000).toLocaleString()} {/* Convert Unix timestamp (in seconds) to JS Date */}
//           </p>
//           {/* Convert BigInt to string for rendering */}
//           <p>Amount Collected: {ethers.formatUnits(campaign.amountCollected.toString(), 'ether')} ETH</p>
//           <img src={campaign.image} alt="campaign" width="400" />
//           <Donate campaignId={index}/>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CampaignList;







// import React from "react";
// import { ethers } from 'ethers';
// import Donate from './Donate'; // Adjust the import path as necessary

// const CampaignList = ({ campaigns, contract }) => {
//   return (
//     <div>
//       <h3>All Campaigns</h3>
      
//       {campaigns.map((campaign, index) => (
//         <div key={index}>
//           <h4>{campaign.title}</h4>
//           <p><strong>Campaign ID: {index}</strong></p> {/* Display Campaign ID */}
//           <p>Description: {campaign.description}</p>
//           <p>Target: {ethers.formatUnits(campaign.target.toString(), 'ether')} ETH</p>
//           <p>
//             Deadline: {new Date(Number(campaign.deadline) * 1000).toLocaleString()} {/* Convert Unix timestamp (in seconds) to JS Date */}
//           </p>
//           <p>Amount Collected: {ethers.formatUnits(campaign.amountCollected.toString(), 'ether')} ETH</p>
//           <img src={campaign.image} alt="campaign" width="400" />
          
//           {/* Add the Donate button for each campaign */}
//           <Donate contract={contract} campaignId={index} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CampaignList;



// import React from "react";
// import { ethers } from 'ethers';
// import Donate from './Donate';

// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="modal show" style={{ display: "block" }}>
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">Donate</h5>
//             <button type="button" className="close" onClick={onClose}>
//               <span>&times;</span>
//             </button>
//           </div>
//           <div className="modal-body">
//             {children}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// const CampaignList = ({ campaigns, contract }) => {
//   return (
//     <div>
//       <h3>All Campaigns</h3>
      
//       {campaigns.map((campaign, index) => (
//         <div key={index}>
//           <h4>{campaign.title}</h4>
//           <p><strong>Campaign ID: {index}</strong></p>
//           <p>Description: {campaign.description}</p>
//           <p>Target: {ethers.formatUnits(campaign.target.toString(), 'ether')} ETH</p>
//           <p>
//             Deadline: {new Date(Number(campaign.deadline) * 1000).toLocaleString()}
//           </p>
//           <p>Amount Collected: {ethers.formatUnits(campaign.amountCollected.toString(), 'ether')} ETH</p>
//           <img src={campaign.image} alt="campaign" width="400" />
          
//           {/* Pass contract and campaignId to Donate component */}
//           <Donate contract={contract} campaignId={index} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CampaignList;

// import React, { useState } from "react";
// import { ethers } from 'ethers';
// import Donate from './Donate';
// import Modal from './Modal'; // Import the modal component

// const CampaignList = ({ campaigns, contract }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCampaignId, setSelectedCampaignId] = useState(null);

//   const openModal = (campaignId) => {
//     setSelectedCampaignId(campaignId);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedCampaignId(null);
//   };

//   return (
//     <div>
//       <h3>All Campaigns</h3>
      
//       {campaigns.map((campaign, index) => (
//         <div key={index}>
//           <h4>{campaign.title}</h4>
//           <p><strong>Campaign ID: {index}</strong></p>
//           <p>Description: {campaign.description}</p>
//           <p>Target: {ethers.formatUnits(campaign.target.toString(), 'ether')} ETH</p>
//           <p>
//             Deadline: {new Date(Number(campaign.deadline) * 1000).toLocaleString()}
//           </p>
//           <p>Amount Collected: {ethers.formatUnits(campaign.amountCollected.toString(), 'ether')} ETH</p>
//           <img src={campaign.image} alt="campaign" width="400" />
          
//           {/* Button to open the modal */}
//           <p></p>
//           <p><button className="btn btn-primary" onClick={() => openModal(index)}>
//             Donate
//           </button></p>
//         </div>
//       ))}

//       {/* Modal to donate */}
//       <Modal isOpen={isModalOpen} onClose={closeModal}>
//         {selectedCampaignId !== null && (
//           <Donate contract={contract} campaignId={selectedCampaignId} />
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default CampaignList;


// import React, { useState } from "react";
// import { ethers } from 'ethers';
// import Donate from './Donate';
// import Donators from './getDonators';
// import Modal from './Modal';

// const CampaignList = ({ campaigns, contract }) => {
//   const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
//   const [isDonatorsModalOpen, setIsDonatorsModalOpen] = useState(false);
//   const [selectedCampaignId, setSelectedCampaignId] = useState(null);

//   const openDonateModal = (campaignId) => {
//     setSelectedCampaignId(campaignId);
//     setIsDonateModalOpen(true);
//   };

//   const closeDonateModal = () => {
//     setIsDonateModalOpen(false);
//     setSelectedCampaignId(null);
//   };

//   const openDonatorsModal = (campaignId) => {
//     setSelectedCampaignId(campaignId);
//     setIsDonatorsModalOpen(true);
//   };

//   const closeDonatorsModal = () => {
//     setIsDonatorsModalOpen(false);
//     setSelectedCampaignId(null);
//   };

//   return (
//     <div>
//       {campaigns.map((campaign) => {
//         const targetInEther = ethers.parseUnits(campaign.target?.toString() || "0", 'ether');
//       const amountCollectedInEther = ethers.parseUnits(campaign.amountCollected?.toString() || "0", 'ether');


//         return (
//           <div key={campaign.id} className="card mt-3">
//             <div className="card-body">
//               <h5 className="card-title">{campaign.title}</h5>
//               <p className="card-text">{campaign.description}</p>
//               <p>Target: {ethers.formatUnits(campaign.target, 'ether')} ETH</p>
//               <p>Deadline: {new Date(Number(campaign.deadline) * 1000).toLocaleString()}</p>
//               <p>Amount Collected: {ethers.formatUnits(campaign.amountCollected, 'ether')} ETH</p>
//               <img src={campaign.image} alt="campaign" width="400" />
//               <br></br><br></br>
//               {campaign.deadline > Date.now() / 1000 && amountCollectedInEther < targetInEther ? (
//                   // <Donate contract={contract} campaign={campaign}/>
//                   <button className="btn btn-primary mr-2" onClick={() => openDonateModal(campaign.id)}>
//                   Donate
//                 </button>
//                 ) : (
//                   <div className="alert alert-info">Campaign is completed or overdue</div>
//                 )}

//               <div className="mt-3">
//                 <button className="btn btn-info" onClick={() => openDonatorsModal(campaign.id)}>
//                   Get Donators
//                 </button>
//               </div>
//             </div>
//           </div>
//         );
//       })}

//       <Modal isOpen={isDonateModalOpen} onClose={closeDonateModal}>
//         {selectedCampaignId !== null && (
//           <Donate contract={contract} campaignId={selectedCampaignId} />
//         )}
//       </Modal>

//       <Modal isOpen={isDonatorsModalOpen} onClose={closeDonatorsModal}>
//         {selectedCampaignId !== null && (
//           <Donators contract={contract} campaignId={selectedCampaignId} />
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default CampaignList;

// import React, { useState } from "react";
// import Donate from './Donate';
// import Donators from './getDonators';
// import Modal from './Modal';

// const CampaignList = ({ campaigns, contract }) => {
//   const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
//   const [isDonatorsModalOpen, setIsDonatorsModalOpen] = useState(false);
//   const [selectedCampaignId, setSelectedCampaignId] = useState(null);

//   const openDonateModal = (campaignId) => {
//     console.log(`Opening donate modal for campaign ID: ${campaignId}`);
//     setSelectedCampaignId(campaignId);
//     setIsDonateModalOpen(true);
//   };

//   const closeDonateModal = () => {
//     console.log(`Closing donate modal for campaign ID: ${selectedCampaignId}`);
//     setIsDonateModalOpen(false);
//     setSelectedCampaignId(null);
//   };

//   const openDonatorsModal = (campaignId) => {
//     console.log(`Opening donators modal for campaign ID: ${campaignId}`);
//     setSelectedCampaignId(campaignId);
//     setIsDonatorsModalOpen(true);
//   };

//   const closeDonatorsModal = () => {
//     console.log(`Closing donators modal for campaign ID: ${selectedCampaignId}`);
//     setIsDonatorsModalOpen(false);
//     setSelectedCampaignId(null);
//   };

//   return (
//     <div>
//       {campaigns.map((campaign, index) => {
//       const targetInEther = BigInt(campaign.target || "0");
//       const amountCollectedInEther = BigInt(campaign.amountCollected || "0");

//       return (
//         <div key={`${campaign.id}-${index}`} className="card mt-3">
//           <div className="card-body">
//             <h5 className="card-title">{campaign.title || "No Title"}</h5>
//             <p className="card-text">{campaign.description || "No Description"}</p>
//             <p>Target: {targetInEther / BigInt(1e18)} ETH</p>
//             <p>Amount Collected: {amountCollectedInEther / BigInt(1e18)} ETH</p>
//           </div>
//         </div>
//       );
//       })}

//       <Modal isOpen={isDonateModalOpen} onClose={closeDonateModal}>
//         {selectedCampaignId !== null && (
//           <Donate contract={contract} campaignId={selectedCampaignId} />
//         )}
//       </Modal>

//       <Modal isOpen={isDonatorsModalOpen} onClose={closeDonatorsModal}>
//         {selectedCampaignId !== null && (
//           <Donators contract={contract} campaignId={selectedCampaignId} />
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default CampaignList;


import React, { useState } from "react";
import { ethers } from 'ethers';
import Donate from './Donate';
import Donators from './getDonators';
import Modal from './Modal';

const CampaignList = ({ campaigns, contract }) => {
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isDonatorsModalOpen, setIsDonatorsModalOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [expandedCampaigns, setExpandedCampaigns] = useState({});

  const toggleDescription = (campaignId) => {
    setExpandedCampaigns((prevState) => ({
      ...prevState,
      [campaignId]: !prevState[campaignId],
    }));
  }; 

  const openDonateModal = (campaignId) => {
    setSelectedCampaignId(campaignId);
    setIsDonateModalOpen(true);
  };

  const closeDonateModal = () => {
    setIsDonateModalOpen(false);
    setSelectedCampaignId(null);
  };

  const openDonatorsModal = (campaignId) => {
    console.log(`Opening donators modal for campaign ID: ${campaignId}`);
    setSelectedCampaignId(campaignId);
    setIsDonatorsModalOpen(true);
  };

  const closeDonatorsModal = () => {
    setIsDonatorsModalOpen(false);
    setSelectedCampaignId(null);
  };

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {campaigns.map((campaign, campaignId) => { // Added index parameter
        // Ensure campaign.target and campaign.amountCollected are in Wei
        const targetInEther = ethers.formatUnits(campaign.target, 'ether');
        const amountCollectedInEther = ethers.formatUnits(campaign.amountCollected, 'ether');

        const isDescriptionExpanded = expandedCampaigns[campaignId];

        console.log('Campaign:', campaign); // Log the campaign object
        console.log(`Target in Ether: ${targetInEther}`); // Log target
        console.log(`Amount Collected in Ether: ${amountCollectedInEther}`); // Log amount collected

        return (
          <div key={campaignId} className="col">
            <div className="card h-100 text-bg-dark mb-3">
              {/* Image with fixed height and object-fit */}
              <img
                src={campaign.image || "https://grans.hse.ru/data/2019/03/04/1196337461/fgsdg.png"} // Default image URL
                className="card-img-top"
                alt="campaign"
                style={{ height: '200px', objectFit: 'cover' }} // Fixed height for consistency
              />
              <div className="card-body">
                <h5 className="card-title">
                  {campaignId + 1}. {campaign.title} {/* Display order number */}
                </h5>
                <p className="card-text">
                  {/* Description with expandable logic */}
                  <p style={{ display: isDescriptionExpanded ? 'block' : '-webkit-box', WebkitLineClamp: isDescriptionExpanded ? 'none' : 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {campaign.description}
                  </p>

                  {/* Toggle button for expanding/collapsing description */}
                  {campaign.description.length > 100 && (
                    <button className="btn btn-link p-0" onClick={() => toggleDescription(campaignId)}>
                      {isDescriptionExpanded ? 'Show Less' : 'Show More'}
                    </button>
                  )}

                  <p><strong>Target:</strong> {targetInEther} ETH</p> {/* Display target in ETH */}
                  <p><strong>Deadline:</strong> {new Date(Number(campaign.deadline) * 1000).toLocaleString()}</p>
                  <p><strong>Amount Collected:</strong> {amountCollectedInEther} ETH</p> {/* Display amount collected in ETH */}

                  {/* Conditional rendering for Donate button */}
                  {campaign.deadline > Date.now() / 1000 && amountCollectedInEther < targetInEther ? (
                    <button className="btn btn-primary mt-2 w-100" onClick={() => openDonateModal(campaignId)}>
                      Donate
                    </button>
                  ) : (
                    <div className="alert alert-info mt-2">Campaign is completed or overdue</div>
                  )}

                  {/* Button to get Donators */}
                  <div className="mt-3">
                    <button className="btn btn-info w-100" onClick={() => openDonatorsModal(campaignId)}>
                      Get Donators
                    </button>
                  </div>
                </p>
              </div>
            </div>
          </div>
        );
      })}

      <Modal isOpen={isDonateModalOpen} onClose={closeDonateModal}>
        {selectedCampaignId !== null && (
          <Donate contract={contract} campaignId={selectedCampaignId} />
        )}
      </Modal>

      <Modal isOpen={isDonatorsModalOpen} onClose={closeDonatorsModal}>
        {selectedCampaignId !== null && (
          <Donators contract={contract} campaignId={selectedCampaignId} />
        )}
      </Modal>
    </div>
  );
};

export default CampaignList;
