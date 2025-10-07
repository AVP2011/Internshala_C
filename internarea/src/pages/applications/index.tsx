// src/pages/applications/index.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Building2,
  Calendar,
  CheckCircle2,
  Mail,
  Tag,
  User,
  XCircle,
} from "lucide-react";
import Link from "next/link";

interface Application {
  _id: string;
  name: string; // applicant name
  email: string; // applicant email
  company: string;
  category?: string;
  createdAt: string;
  status: "Pending" | "Rejected" | "Confirmed" | "accepted" | "rejected";
}

const getStatusColor = (status: string) => {
  if (!status) return "bg-yellow-100 text-yellow-800";
  switch (status.toLowerCase()) {
    case "accepted":
    case "confirmed":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-yellow-100 text-yellow-800";
  }
};

const ApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "rejected">("all");

  // Fetch all applications from backend
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get<Application[]>("http://localhost:5000/api/application");
        // Default status to Pending if missing
        const appsWithDefaultStatus = res.data.map((app) => ({
          ...app,
          status: app.status ?? "Pending",
        }));
        setApplications(appsWithDefaultStatus);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch applications");
      }
    };
    fetchApplications();
  }, []);

  // Handle accept/reject
  const handleAcceptReject = async (id: string, action: "accepted" | "rejected") => {
    try {
      const res = await axios.put(`http://localhost:5000/api/application/${id}`, { action });
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status: action } : app))
      );
      toast.success("Application updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update application");
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      (app.company ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.category ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.name ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.email ?? "").toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === "all") return matchesSearch;
    return matchesSearch && app.status?.toLowerCase() === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
            <p className="mt-1 text-sm text-gray-500">Manage and review applications</p>
          </div>

          {/* Filters & Search */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex-1 w-full relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by company, category, name, email..."
                  className="text-black w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Mail className="absolute top-3 left-3 text-gray-400" />
              </div>
              <div className="flex gap-2">
                {["all", "pending", "accepted", "rejected"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      filter === f
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Applications Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company & Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                          <Building2 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{app.company}</div>
                          {app.category && (
                            <div className="flex items-center text-sm text-gray-500">
                              <Tag className="h-4 w-4 mr-1" />
                              {app.category}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-100 rounded-full">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{app.name}</div>
                          <div className="text-sm text-gray-500">{app.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {app.createdAt
                          ? new Date(app.createdAt).toISOString().split("T")[0]
                          : "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <Link href={`/detailapplication/${app._id}`} className="text-blue-600 hover:text-blue-900">
                          View Details
                        </Link>
                        <button
                          onClick={() => handleAcceptReject(app._id, "accepted")}
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckCircle2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleAcceptReject(app._id, "rejected")}
                          className="text-red-600 hover:text-red-900"
                        >
                          <XCircle className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredApplications.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No applications found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;
