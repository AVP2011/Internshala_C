// src/components/ApplyModal.tsx
import React, { useState } from "react";
import { X } from "lucide-react";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ isOpen, onClose, jobTitle }) => {
  const [availability, setAvailability] = useState<"immediate" | "date" | "">("");
  const [date, setDate] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      availability: availability === "immediate" ? "Immediate" : date,
      resume: resumeFile?.name || "Default resume",
    };
    console.log("Application submitted:", payload);
    alert("Application submitted successfully!");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {/* Modal Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Apply now</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Resume Section */}
            <div>
              <p className="font-medium text-black">Your resume <span className="text-sm text-gray-400">• Updated recently</span></p>
              <p className="text-sm text-black mt-1">
                Your current resume will be submitted along with this application.{" "}
                <a href="#" className="text-blue-600 font-medium hover:underline">
                  Edit resume
                </a>
              </p>
            </div>

            {/* Availability Section */}
            <div>
              <p className="font-medium text-black ">Confirm your availability</p>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="availability"
                    value="immediate"
                    checked={availability === "immediate"}
                    onChange={() => setAvailability("immediate")}
                    className="text-blue-600"
                  />
                  <span className="text-black">Yes, I am available to join immediately</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="availability"
                    value="date"
                    checked={availability === "date"}
                    onChange={() => setAvailability("date")}
                    className="text-blue-600"
                  />
                  <span className="text-black">No (Please specify your availability)</span>
                </label>
                {availability === "date" && (
                  <input
                    type="text"
                    placeholder="e.g. Available from 15th Oct"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border p-2 w-full rounded text-sm"
                    required
                  />
                )}
              </div>
            </div>

            {/* Custom Resume Upload */}
            <div>
              <p className="font-medium text-black">
                Custom resume <span className="text-sm text-black">(Optional)</span>
              </p>
              <p className="text-sm text-black">
                Employer can download and view this resume
              </p>

              {!resumeFile ? (
                <label className="mt-2 block border border-gray-300 p-3 rounded-md text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
                  <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} />
                  <span className="text-blue-600">+ Upload Resume (PDF)</span>
                </label>
              ) : (
                <div className="mt-3 flex items-center justify-between border p-3 rounded bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">PDF</span>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{resumeFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {(resumeFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setResumeFile(null)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;