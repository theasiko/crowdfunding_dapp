const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Funding Contract", function () {
    let Funding, funding, owner, addr1, addr2;
    
    beforeEach(async function () {
        Funding = await ethers.getContractFactory("Funding");
        [owner, addr1, addr2] = await ethers.getSigners();
        funding = await Funding.deploy();
        await funding.deployed();
    });

    it("should create a campaign", async function () {
        const title = "Test Campaign";
        const description = "This is a test campaign";
        const target = ethers.utils.parseEther("1.0");
        const deadline = Math.floor(Date.now() / 1000) + 86400; // 1 day from now
        const image = "https://example.com/image.png";

        const tx = await funding.createCampaign(owner.address, title, description, target, deadline, image);
        await tx.wait();

        const campaigns = await funding.getCampaigns();
        expect(campaigns.length).to.equal(1);

        const createdCampaign = campaigns[0];
        expect(createdCampaign.owner).to.equal(owner.address);
        expect(createdCampaign.title).to.equal(title);
        expect(createdCampaign.description).to.equal(description);
        expect(createdCampaign.target).to.equal(target);
        expect(createdCampaign.deadline).to.equal(deadline);
        expect(createdCampaign.amountCollected).to.equal(0);
    });

    it("should allow the campaign owner to update the campaign", async function () {
        const title = "Test Campaign";
        const description = "This is a test campaign";
        const target = ethers.utils.parseEther("1.0");
        const deadline = Math.floor(Date.now() / 1000) + 86400; // 1 day from now
        const image = "https://example.com/image.png";

        const tx = await funding.createCampaign(owner.address, title, description, target, deadline, image);
        await tx.wait();

        const newTitle = "Updated Campaign";
        const newDescription = "Updated description";
        const newDeadline = Math.floor(Date.now() / 1000) + 172800; // 2 days from now

        const campaignId = 0;
        const updateTx = await funding.updateCampaign(campaignId, newTitle, newDescription, newDeadline);
        await updateTx.wait();

        const campaigns = await funding.getCampaigns();
        const updatedCampaign = campaigns[0];

        expect(updatedCampaign.title).to.equal(newTitle);
        expect(updatedCampaign.description).to.equal(newDescription);
        expect(updatedCampaign.deadline).to.equal(newDeadline);
    });

    it("should only allow the owner to update the campaign", async function () {
        const title = "Test Campaign";
        const description = "This is a test campaign";
        const target = ethers.utils.parseEther("1.0");
        const deadline = Math.floor(Date.now() / 1000) + 86400;
        const image = "https://example.com/image.png";

        const tx = await funding.createCampaign(owner.address, title, description, target, deadline, image);
        await tx.wait();

        const newTitle = "Updated Campaign";
        const newDescription = "Updated description";
        const newDeadline = Math.floor(Date.now() / 1000) + 172800;

        const campaignId = 0;
        await expect(
            funding.connect(addr1).updateCampaign(campaignId, newTitle, newDescription, newDeadline)
        ).to.be.revertedWith("Only the campaign owner can update the campaign.");
    });

    it("should allow users to donate to a campaign", async function () {
        const title = "Test Campaign";
        const description = "This is a test campaign";
        const target = ethers.utils.parseEther("1.0");
        const deadline = Math.floor(Date.now() / 1000) + 86400;
        const image = "https://example.com/image.png";

        const tx = await funding.createCampaign(owner.address, title, description, target, deadline, image);
        await tx.wait();

        const donationAmount = ethers.utils.parseEther("0.1");

        await funding.connect(addr1).donateToCampaign(0, { value: donationAmount });

        const campaigns = await funding.getCampaigns();
        const campaign = campaigns[0];

        expect(campaign.amountCollected).to.equal(donationAmount);

        const [donators, donations] = await funding.getDonators(0);
        expect(donators[0]).to.equal(addr1.address);
        expect(donations[0]).to.equal(donationAmount);
    });

    it("should not allow donations exceeding the target", async function () {
        const title = "Test Campaign";
        const description = "This is a test campaign";
        const target = ethers.utils.parseEther("1.0");
        const deadline = Math.floor(Date.now() / 1000) + 86400;
        const image = "https://example.com/image.png";

        const tx = await funding.createCampaign(owner.address, title, description, target, deadline, image);
        await tx.wait();

        const donationAmount = ethers.utils.parseEther("1.1"); // Exceeds target
        await expect(
            funding.connect(addr1).donateToCampaign(0, { value: donationAmount })
        ).to.be.revertedWith("Campaign has already reached its target.");
    });

    it("should not allow donations after the deadline", async function () {
        const title = "Test Campaign";
        const description = "This is a test campaign";
        const target = ethers.utils.parseEther("1.0");
        const deadline = Math.floor(Date.now() / 1000) + 1; // Expires soon
        const image = "https://example.com/image.png";

        const tx = await funding.createCampaign(owner.address, title, description, target, deadline, image);
        await tx.wait();

        await ethers.provider.send("evm_increaseTime", [2]); // Move time past the deadline
        await ethers.provider.send("evm_mine", []);

        await expect(
            funding.connect(addr1).donateToCampaign(0, { value: ethers.utils.parseEther("0.1") })
        ).to.be.revertedWith("Campaign has ended.");
    });
});
