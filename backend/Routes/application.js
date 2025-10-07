const express = require("express");
const router = express.Router();
const Application = require("../Model/Application");

// ------------------------
// CREATE APPLICATION
// ------------------------
router.post("/", async (req, res) => {
  try {
    const applicationData = new Application({
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      profilePic: req.body.profilePic,
      resume: req.body.resume,
      jobTitle: req.body.jobTitle,
      company: req.body.company,
      category: req.body.category,
      coverLetter: req.body.coverLetter,
      Application: req.body.Application,
      appliedOn: req.body.appliedOn,
      availability: req.body.availability,
      reason: req.body.reason,
      status: req.body.status || "Pending", // default to Pending
    });

    const savedData = await applicationData.save();
    res.status(201).json(savedData);
  } catch (error) {
    console.log("Error creating application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ------------------------
// GET ALL APPLICATIONS
// ------------------------
router.get("/", async (req, res) => {
  try {
    const data = await Application.find();
    res.status(200).json(data);
  } catch (error) {
    console.log("Error fetching applications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ------------------------
// GET APPLICATION BY ID
// ------------------------
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Application.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.log("Error fetching application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ------------------------
// UPDATE APPLICATION STATUS
// ------------------------
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;

  let status;
  if (action === "accepted") status = "accepted";
  else if (action === "rejected") status = "rejected";
  else return res.status(400).json({ error: "Invalid action" });

  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.status(200).json({ success: true, data: updatedApplication });
  } catch (error) {
    console.log("Error updating application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
