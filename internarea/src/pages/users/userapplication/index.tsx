import React, { useState, useEffect } from "react";

interface Application {
  id: string;
  company: string;
  category: string;
  applicant: string;
  email: string;
  appliedDate: string;
  status: "Pending" | "Approved" | "Rejected";
}

// Status colors mapping
const statusColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Approved: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

const UserApplications: React.FC = () => {
  // Simulate logged-in user (replace with actual login logic)
  const user = {
    name: "Aryan Pandey",
    email: "aryan@example.com",
  };

  const [applications, setApplications] = useState<Application[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Pending" | "Approved" | "Rejected">("All");

  useEffect(() => {
    if (!user) return;

    // Fetch applications from backend here
    const fetchApplications = async () => {
      try {
        // Example: Replace with your API call
        // const res = await fetch(`/api/applications?email=${user.email}`);
        // const data = await res.json();

        // Using mock data for now
        const mockData: Application[] = [
          {
            id: "APP-1012",
            company: "Health Solutions",
            category: "Healthcare",
            applicant: user.name,
            email: user.email,
            appliedDate: "2024-03-08",
            status: "Pending",
          },
          {
            id: "APP-1013",
            company: "EduLearn",
            category: "Education",
            applicant: user.name,
            email: user.email,
            appliedDate: "2024-03-05",
            status: "Rejected",
          },
        ];
        setApplications(mockData);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      }
    };

    fetchApplications();
  }, [user]);

  // Filtered applications
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(search.toLowerCase()) ||
      app.category.toLowerCase().includes(search.toLowerCase()) ||
      app.applicant.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || app.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>
      <p className="text-gray-600 mb-6">Track and manage your job and internship applications</p>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by company, category, or applicant..."
          className="border px-4 py-2 rounded w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          {(["All", "Pending", "Approved", "Rejected"] as const).map((f) => (
            <button
              key={f}
              className={`px-4 py-1 rounded font-medium ${
                filter === f ? "bg-blue-500 text-white" : "bg-white border"
              }`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Company & Category</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Applicant</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Applied Date</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredApps.map((app) => (
              <tr key={app.id}>
                <td className="px-4 py-3">
                  <div className="font-medium">{app.company}</div>
                  <div className="text-gray-500 text-sm">{app.category}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs text-white">
                      {app.applicant[0]}
                    </div>
                    <div>
                      <div>{app.applicant}</div>
                      <div className="text-gray-500 text-sm">{app.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{app.appliedDate}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[app.status]}`}
                  >
                    {app.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredApps.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-4 text-center text-gray-500">
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserApplications;



