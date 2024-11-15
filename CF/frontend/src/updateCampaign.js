import React, { useState } from 'react';

const UpdateCampaign = ({ contract, account }) => {
  const [campaignId, setCampaignId] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [newImage, setNewImage] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleUpdate = async () => {
    if (contract && account) {
      try {
        const deadlineTimestamp = Math.floor(new Date(newDeadline).getTime() / 1000); // Convert to Unix timestamp
        const tx = await contract.updateCampaign(campaignId, newTitle, newDescription, deadlineTimestamp, newImage);
        await tx.wait(); // Wait for transaction to be mined
        // alert('Campaign updated successfully');
        setSuccessMessage("Donation successful!");
      } catch (error) {
        console.error("Error updating campaign: ", error);
        // alert('Error updating campaign');
        setErrorMessage("Failed to update. Please check your network or Metamask.");
      }
    }
  };

  return (
    <div className="mt-5">
      <h3>Update an Existing Campaign</h3>
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
      {/* Input for Campaign ID */}
      <div className="form-group">
        <label>Campaign ID</label>
        <input
          type="number"
          className="form-control"
          placeholder="Enter the Campaign ID to update"
          value={campaignId}
          onChange={(e) => setCampaignId(e.target.value)}
        />
      </div>

      {/* Input for New Title */}
      <div className="form-group">
        <label>New Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter the new title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </div>

      {/* Input for New Description */}
      <div className="form-group">
        <label>New Description</label>
        <textarea
          className="form-control"
          placeholder="Enter the new description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </div>

      {/* Input for New Deadline */}
      <div className="form-group">
        <label>New Deadline</label>
        <input
          type="date"
          className="form-control"
          value={newDeadline}
          onChange={(e) => setNewDeadline(e.target.value)}
        />
      </div>

      {/* Input for New Image */}
      <div className="form-group">
        <label>New Image source</label>
        <input
            type="text"
            className="form-control"
            placeholder="Enter the new Image URL"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
          />
      </div>

      {/* Update Button */}
      <button className="btn btn-primary mt-3" onClick={handleUpdate}>
        Update Campaign
      </button>
    </div>
  );
};

export default UpdateCampaign;
