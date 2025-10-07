const mongoose = require("mongoose");

const InternshipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    aboutCompany: { type: String, required: true },
    aboutInternship: { type: String, required: true }, // description
    whoCanApply: { type: String },
    perks: { type: [String], default: [] }, // array of perks
    numberOfOpening: { type: Number, default: 1, min: 1 },
    stipend: { type: String },
    startDate: { type: String },
    duration: { type: String },
    skills: { type: [String], default: [] },
    additionalInfo: { type: String },
    workFromHome: { type: Boolean, default: false },
    partTime: { type: Boolean, default: false },
    applyLink: { type: String },
    responsibilities: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Internship", InternshipSchema);
