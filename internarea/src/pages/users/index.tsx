// pages/users/index.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";


interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joined: string;
}

const mockUsers: User[] = [
  {
    id: "USR-001",
    name: "Aryan Pandey",
    email: "aryan@example.com",
    role: "Student",
    status: "Active",
    joined: "2025-03-15",
  },
  {
    id: "USR-002",
    name: "Priya Sharma",
    email: "priya@example.com",
    role: "Recruiter",
    status: "Suspended",
    joined: "2025-04-02",
  },
  {
    id: "USR-003",
    name: "Rohan Kumar",
    email: "rohan@example.com",
    role: "Student",
    status: "Active",
    joined: "2025-01-27",
  },
  {
    id: "USR-004",
    name: "Sneha Verma",
    email: "sneha@example.com",
    role: "Recruiter",
    status: "Pending",
    joined: "2025-05-11",
  },
];

const ManageUsers: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // 🔐 Auth Guard
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("admin_auth") !== "1"
    ) {
      router.replace("/adminlogin");
    }
  }, [router]);

  const filtered = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || user.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = (id: string, newStatus: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u))
    );
    alert(`Status updated to ${newStatus} for ${id}`);
  };

  const statusColors: Record<string, string> = {
    Active: "#22c55e", // green
    Pending: "#eab308", // yellow
    Suspended: "#ef4444", // red
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#0f172a", // dark background
      padding: "24px",
      fontFamily: "Inter,system-ui,sans-serif",
      color: "#f1f5f9",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 20,
      flexWrap: "wrap" as const,
      gap: 16,
    },
    title: { fontSize: 26, fontWeight: 700 },
    controls: { display: "flex", gap: 12 },
    input: {
      padding: "6px 10px",
      borderRadius: 6,
      border: "1px solid #475569",
      background: "#1e293b",
      color: "#f1f5f9",
    },
    select: {
      padding: "6px 10px",
      borderRadius: 6,
      border: "1px solid #475569",
      background: "#1e293b",
      color: "#f1f5f9",
    },
    tableWrap: {
      background: "#1e293b",
      borderRadius: 12,
      boxShadow: "0 4px 12px rgba(0,0,0,.5)",
      overflow: "hidden",
    },
    table: { width: "100%", borderCollapse: "collapse" as const },
    th: {
      padding: "14px 16px",
      background: "#0f172a",
      borderBottom: "2px solid #334155",
      fontWeight: 600,
      fontSize: 13,
      textTransform: "uppercase" as const,
      color: "#94a3b8",
    },
    td: {
      padding: "14px 16px",
      borderBottom: "1px solid #334155",
      fontSize: 14,
      color: "#f8fafc",
    },
    statusSelect: {
      padding: "4px 8px",
      borderRadius: 6,
      border: "1px solid #334155",
      background: "#0f172a",
      color: "#f8fafc",
    },
    statusBadge: (status: string) => ({
      padding: "4px 10px",
      borderRadius: 12,
      fontSize: 13,
      fontWeight: 600,
      background: `${statusColors[status]}22`, // light tint
      color: statusColors[status],
      border: `1px solid ${statusColors[status]}`,
    }),
    backBtn: {
      marginTop: 24,
      height: 44,
      background: "#2563eb",
      color: "#fff",
      border: "none",
      borderRadius: 10,
      fontWeight: 600,
      cursor: "pointer",
      padding: "0 24px",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Manage Users</h1>
        <div style={styles.controls}>
          <input
            type="text"
            placeholder="Search users..."
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
            <option value="Active">Active</option>
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
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id}>
                <td style={styles.td}>{user.id}</td>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.role}</td>
                <td style={styles.td}>
                  <span style={styles.statusBadge(user.status)}>
                    {user.status}
                  </span>
                </td>
                <td style={styles.td}>{user.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        style={styles.backBtn}
        onClick={() => router.push("/adminpanel")}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default ManageUsers;
