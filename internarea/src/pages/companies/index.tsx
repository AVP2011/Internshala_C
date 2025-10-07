// pages/companies/index.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ManageCompanies: React.FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [companies, setCompanies] = useState([
    {
      id: "CMP-001",
      name: "TechCorp Inc.",
      email: "contact@techcorp.com",
      status: "Verified",
      joined: "2025-03-12",
    },
    {
      id: "CMP-002",
      name: "Innovate Labs",
      email: "hello@innovate.io",
      status: "Pending",
      joined: "2025-04-05",
    },
    {
      id: "CMP-003",
      name: "Global Solutions",
      email: "support@globalsol.com",
      status: "Suspended",
      joined: "2025-01-28",
    },
    {
      id: "CMP-004",
      name: "Alpha Dynamics",
      email: "info@alphadyn.com",
      status: "Verified",
      joined: "2025-05-19",
    },
  ]);

  // 🔐 Auth Guard
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("admin_auth") !== "1"
    ) {
      router.replace("/adminlogin");
    }
  }, [router]);

  // 🔍 Filter
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || company.status === filter;
    return matchesSearch && matchesFilter;
  });

  // ✅ Update status
  const handleStatusChange = (id: string, newStatus: string) => {
    setCompanies((prev) =>
      prev.map((company) =>
        company.id === id ? { ...company, status: newStatus } : company
      )
    );
    alert(`Status updated to ${newStatus} for ${id}`);
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(180deg, #f7fbff 0%, #eef6ff 100%)",
      padding: "24px",
      fontFamily:
        "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
      flexWrap: "wrap" as const,
      gap: 16,
    },
    title: { margin: 0, fontSize: 28, fontWeight: 800, color: "#0f172a" },
    controls: { display: "flex", gap: 16, alignItems: "center" },
    input: {
      height: 40,
      border: "1px solid #dbe4ee",
      borderRadius: 8,
      padding: "0 12px",
      fontSize: 14,
    },
    select: {
      height: 40,
      border: "1px solid #dbe4ee",
      borderRadius: 8,
      padding: "0 12px",
      fontSize: 14,
    },
    tableWrap: {
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 12px 30px rgba(2, 97, 163, 0.12)",
      border: "1px solid #e6eef6",
      overflow: "hidden",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse" as const,
    },
    th: {
      textAlign: "left" as const,
      padding: "14px 16px",
      background: "#f8fbff",
      borderBottom: "2px solid #e6eef6",
      fontSize: 13,
      fontWeight: 700,
      color: "#334155",
      textTransform: "uppercase" as const,
      letterSpacing: "0.5px",
    },
    td: {
      padding: "14px 16px",
      borderBottom: "1px solid #edf2f7",
      fontSize: 14,
      color: "#0f172a",
    },
    actionsCell: {
      display: "flex",
      gap: 8,
    },
    button: {
      height: 36,
      padding: "0 12px",
      borderRadius: 6,
      border: "none",
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 600,
    },
    editBtn: {
      background: "#dbeafe",
      color: "#1e40af",
    },
    deleteBtn: {
      background: "#fee2e2",
      color: "#991b1b",
    },
    statusSelect: {
      height: 32,
      padding: "0 8px",
      borderRadius: 6,
      border: "1px solid #cbd5e1",
      fontSize: 12,
    },
    backBtn: {
      marginTop: 24,
      height: 44,
      background: "#008bdc",
      color: "#fff",
      border: "none",
      borderRadius: 10,
      fontWeight: 700,
      cursor: "pointer",
      boxShadow: "0 10px 20px rgba(0,139,220,.15)",
      padding: "0 24px",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Manage Companies</h1>
        <div style={styles.controls}>
          <input
            type="text"
            placeholder="Search companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={styles.select}
          >
            <option value="all">All Status</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Company Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Joined</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((company) => (
              <tr key={company.id}>
                <td style={styles.td}>{company.id}</td>
                <td style={styles.td}>{company.name}</td>
                <td style={styles.td}>{company.email}</td>
                <td style={styles.td}>
                  <select
                    value={company.status}
                    onChange={(e) =>
                      handleStatusChange(company.id, e.target.value)
                    }
                    style={styles.statusSelect}
                  >
                    <option value="Verified">Verified</option>
                    <option value="Pending">Pending</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </td>
                <td style={styles.td}>{company.joined}</td>
                <td style={{ ...styles.td, ...styles.actionsCell }}>
                  <button style={{ ...styles.button, ...styles.editBtn }}>
                    Edit
                  </button>
                  <button style={{ ...styles.button, ...styles.deleteBtn }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        style={styles.backBtn}
        onClick={() => router.push("/adminpanel")}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "#0079c2")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "#008bdc")
        }
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default ManageCompanies;
