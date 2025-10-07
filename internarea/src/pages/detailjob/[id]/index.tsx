// pages/detailjob/[id]/index.tsx
import { selectUser } from "@/Feature/userSlice";
import axios from "axios";
import {
  ArrowUpRight,
  Calendar,
  Clock,
  DollarSign,
  ExternalLink,
  MapPin,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const JobDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [jobData, setJobData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [availability, setAvailability] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TODO: Replace with your actual logged-in user object
  const user =   useSelector(selectUser);
  // Fetch job details
  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      try {
        const res = await axios.get(`https://internshala-c.onrender.com/api/job/${id}`);
        setJobData(res.data);
      } catch (error) {
        console.error("Error fetching job:", error);
        toast.error("Failed to load job details");
      }
    };
    fetchJob();
  }, [id]);

  // Submit job application
  const handleSubmitApplication = async () => {
    if (!coverLetter.trim()) {
      toast.error("Please write a cover letter");
      return;
    }
    if (!availability) {
      toast.error("Please select your availability");
      return;
    }

    const applicationData = {
      user,
      jobId: id,
      company: jobData?.company || "",
      category: jobData?.category || "",
      coverLetter,
      availability,
    };

    try {
      setIsSubmitting(true);
      await axios.post(`s://internshala-c.onrender.com/api/application`, applicationData);
      toast.success("Application submitted successfully!");
      setIsModalOpen(false);
      router.push("/job"); // redirect to jobs page after submission
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!jobData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Job Header */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-2 text-green-600 mb-2">
            <ArrowUpRight className="h-5 w-5" />
            <span className="font-medium">Actively Hiring</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{jobData.title}</h1>
          <p className="text-lg text-gray-600 mb-4">{jobData.company}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-600">
            <div><strong>Location:</strong> {jobData.location}</div>
            <div><strong>Category:</strong> {jobData.category}</div>
            <div><strong>Salary:</strong> {jobData.salary}</div>
          </div>
        </div>

        {/* About Company */}
        {jobData.aboutCompany && (
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900 mb-2">About Company</h2>
            <p className="text-gray-600">{jobData.aboutCompany}</p>
          </div>
        )}

        {/* About Job */}
        {jobData.aboutJob && (
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900 mb-2">About the Job</h2>
            <p className="text-gray-600">{jobData.aboutJob}</p>
          </div>
        )}

        {/* Apply Button */}
        <div className="p-6 flex justify-center">
          {user ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-150"
            >
              Apply Now
            </button>
          ) : (
            <Link
              href="/"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-150"
            >
              Sign up to apply
            </Link>
          )}
        </div>
      </div>

      {/* Apply Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Apply to {jobData.company}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Cover Letter */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Cover Letter
                </h3>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Write your cover letter here..."
                />
              </div>

              {/* Availability */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Your Availability
                </h3>
                <div className="space-y-3">
                  {[
                    "Available immediately",
                    "Currently on notice period",
                    "Will serve notice period",
                    "Other",
                  ].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value={option}
                        checked={availability === option}
                        onChange={(e) => setAvailability(e.target.value)}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSubmitApplication}
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;
