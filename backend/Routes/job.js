const express = require("express");
const router = express.Router();
const Job = require("../Model/Job");

// Create Job
router.post("/", async (req, res) => {
   
const jobData = new Job({
  title: req.body.title,
  company: req.body.company,
  location: req.body.location,
  category: req.body.category,
  aboutCompany: req.body.aboutCompany,
  aboutJob: req.body.aboutJob,
  keyResponsibilities: req.body.keyResponsibilities,
  qualifications: req.body.qualifications,
  salary: req.body.salary,
  duration: req.body.duration,
  startDate: req.body.startDate,
  numberOfOpenings: req.body.numberOfOpenings,
  skills: req.body.skills,
  perks: req.body.perks,
  applicationLink: req.body.applicationLink,
});

     await jobdata.save().then((data)=>{
    res.send(data)
  }).catch((error)=>{
    console.log(error)
  })
});

router.get("/", async (req, res) => {
  try {
    const data = await Job.find();
    res.json(data).status(200);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "internal server error" });
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Job.findById(id);
    if (!data) {
      res.status(404).json({ error: "Jobs not found" });
    }
    res.json(data).status(200);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "internal server error" });
  }
});
module.exports=router