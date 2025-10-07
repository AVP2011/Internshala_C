const express = require("express");
const router = express.Router();
const Internship = require("../Model/Internship");

// Create Internship
router.post("/", async (req, res) => {
  try {
    const internshipData = new Internship({
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      category: req.body.category,
      aboutCompany: req.body.aboutCompany,
      aboutInternship: req.body.aboutInternship,
      whoCanApply: req.body.whoCanApply,
      perks: req.body.perks || [],
      numberOfOpening: req.body.numberOfOpening || 1,
      stipend: req.body.stipend,
      startDate: req.body.startDate,
      duration: req.body.duration,
      skills: req.body.skills || [],
      additionalInfo: req.body.additionalInfo,
      workFromHome: req.body.workFromHome || false,
      partTime: req.body.partTime || false,
      applyLink: req.body.applyLink || "",
      responsibilities: req.body.responsibilities || [],
    });

    const savedInternship = await internshipData.save();
    res.status(201).json(savedInternship);
  } catch (error) {
    console.error("Error creating internship:", error);
    res.status(500).json({ message: "Error creating internship", error });
  }
});

// Get all internships
router.get("/", async (req, res) => {
  try {
    const data = await Internship.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("🔥 Error fetching internships:");
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

// Get internship by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Internship.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Internship not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching internship by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
