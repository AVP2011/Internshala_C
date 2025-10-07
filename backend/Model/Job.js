const mongoose = require("mongoose");
const JobSchema = new mongoose.Schema({
  title: String,
  company: String,
  jobId: String,
  location: String,
  category: String,
  aboutCompany: String,
  aboutJob: String,
  keyResponsibilities: String, // ✅ added
  qualifications: String, // ✅ added
  salary: String,
  duration: String,
  startDate: String,
  numberOfOpenings: String,
  skills: String, // ✅ Required skills
  perks: String, // ✅ Perks & Benefits
  applicationLink: String, // ✅ added if used
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Job", JobSchema);