// pages/adminpanel/index.tsx
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const AdminPanel: React.FC = () => {
  const router = useRouter();

  // 🔐 Auth Guard
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("admin_auth") !== "1") {
      router.replace("/adminlogin");
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem("admin_auth");
    router.replace("/adminlogin");
  };

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      background: "#f9fbfd",
      color: "#0f172a",
      fontFamily: "Inter, system-ui, sans-serif",
    } as React.CSSProperties,

    /* Sidebar */
    sidebar: {
      width: 240,
      background: "#0b1f33",
      color: "#e2e8f0",
      display: "flex",
      flexDirection: "column",
      padding: "20px 14px",
      height: "100vh",
      position: "sticky",
      top: 0,
    } as React.CSSProperties,
    brand: {
      fontWeight: 800,
      letterSpacing: 0.5,
      padding: "12px",
      borderRadius: 10,
      marginBottom: 22,
      background: "linear-gradient(90deg,#0ea5e9,#38bdf8)",
      color: "#fff",
      textAlign: "center" as const,
    },
    navItem: {
      padding: "10px 12px",
      borderRadius: 8,
      marginBottom: 6,
      cursor: "pointer",
      transition: "all .2s",
      fontWeight: 600,
    },
    navItemActive: {
      background: "rgba(14,165,233,0.18)",
      color: "#fff",
      border: "1px solid rgba(14,165,233,0.35)",
    },
    sidebarFooter: {
      marginTop: "auto",
      fontSize: 12,
      color: "#94a3b8",
      padding: "10px 12px",
    },

    /* Main */
    main: { flex: 1, padding: "24px 28px" },
    header: { display: "flex", justifyContent: "space-between", marginBottom: 20, alignItems: "center" },
    title: { fontSize: 22, fontWeight: 800 },
    subtitle: { marginTop: 4, color: "#64748b", fontSize: 14 },
    actions: { display: "flex", gap: 12 },

    /* Buttons */
    button: {
      height: 38,
      padding: "0 14px",
      borderRadius: 8,
      border: "1px solid #dbe6f3",
      background: "#fff",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all .2s",
    },
    buttonPrimary: {
      height: 38,
      padding: "0 16px",
      borderRadius: 8,
      border: "none",
      background: "#008bdc",
      color: "#fff",
      fontWeight: 700,
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(0,139,220,.2)",
      transition: "all .2s",
    },

    /* Stats */
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: 18,
      marginBottom: 24,
    },
    statCard: {
      padding: 16,
      borderRadius: 14,
      background: "linear-gradient(180deg,#ffffff,#f8fbff)",
      border: "1px solid #e6eef6",
      boxShadow: "0 4px 12px rgba(2,97,163,0.06)",
    },
    statLabel: { fontSize: 13, color: "#64748b", fontWeight: 600 },
    statValue: { fontSize: 24, fontWeight: 900, marginTop: 4 },
    statDelta: { fontSize: 12, fontWeight: 600 },

    /* Table */
    card: {
      background: "#fff",
      borderRadius: 14,
      padding: 16,
      boxShadow: "0 4px 16px rgba(2,97,163,0.08)",
      border: "1px solid #e6eef6",
    },
    tableWrap: { overflowX: "auto" },
    table: { width: "100%", borderCollapse: "collapse" },
    th: {
      fontSize: 12,
      textTransform: "uppercase" as const,
      letterSpacing: 0.5,
      padding: "12px 10px",
      borderBottom: "2px solid #e6eef6",
      background: "#f8fbff",
      color: "#475569",
      textAlign: "left" as const,
    },
    td: {
      padding: "12px 10px",
      borderBottom: "1px solid #edf2f7",
      fontSize: 14,
      color: "#0f172a",
    },
    rowHover: { transition: "background .2s" },
    statusPill: {
      padding: "4px 10px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 700,
      display: "inline-block",
    },
    viewBtn: {
      fontSize: 12,
      fontWeight: 600,
      padding: "4px 8px",
      borderRadius: 6,
      background: "#f1f5f9",
      border: "1px solid #dbe4ee",
      cursor: "pointer",
      transition: "all .2s",
    },
  };

  const stats = [
    { label: "Total Users", value: 12450, delta: "+2.1%", deltaColor: "#16a34a" },
    { label: "Active Jobs", value: 87, delta: "+5", deltaColor: "#16a34a" },
    { label: "Internships", value: 142, delta: "-3", deltaColor: "#ef4444" },
    { label: "Applications", value: 2315, delta: "+8.4%", deltaColor: "#16a34a" },
  ];

  const applications = [
    { id: "APP-1012", name: "John Carter", role: "Frontend Intern", type: "Internship", status: "Pending", date: "2025-09-26" },
    { id: "APP-1013", name: "Priya Verma", role: "Data Analyst", type: "Job", status: "Reviewed", date: "2025-09-26" },
    { id: "APP-1014", name: "Aman Gupta", role: "Marketing Intern", type: "Internship", status: "Selected", date: "2025-09-25" },
    { id: "APP-1015", name: "Lisa Wong", role: "UX Designer", type: "Job", status: "Rejected", date: "2025-09-24" },
  ];

  const pillStyles = (status: string): React.CSSProperties => {
    const map: Record<string, { bg: string; color: string }> = {
      Pending: { bg: "rgba(234,179,8,.15)", color: "#854d0e" },
      Reviewed: { bg: "rgba(59,130,246,.15)", color: "#1e3a8a" },
      Selected: { bg: "rgba(34,197,94,.15)", color: "#166534" },
      Rejected: { bg: "rgba(239,68,68,.15)", color: "#7f1d1d" },
    };
    return { ...styles.statusPill, ...map[status] };
  };

  const currentPath = router.pathname;

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.brand}>Admin Panel</div>

        {[
          { label: "Dashboard", path: "/adminpanel" },
          { label: "Jobs", path: "/postjob" },
          { label: "Internships", path: "/postinternship" },
          { label: "Companies", path: "/companies" },
          { label: "Users", path: "/users" },
          { label: "Applications", path: "/applications" },
          { label: "Settings", path: "/settings" },
        ].map(({ label, path }) => {
          const isActive = currentPath === path;
          return (
            <Link href={path} key={label}>
              <div
                style={{
                  ...styles.navItem,
                  ...(isActive ? styles.navItemActive : {}),
                }}
              >
                {label}
              </div>
            </Link>
          );
        })}

        <div style={styles.sidebarFooter}>v0.2.0 • Admin Dashboard 🚀</div>
      </aside>

      {/* Main */}
      <main style={styles.main}>
        {/* Header */}
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>Dashboard Overview</h1>
            <p style={styles.subtitle}>Quick stats & recent activities</p>
          </div>
          <div style={styles.actions}>
            <button style={styles.button}>Refresh</button>
            <button style={styles.buttonPrimary} onClick={logout}>
              Logout
            </button>
          </div>
        </header>

        {/* Stats */}
        <section style={styles.grid}>
          {stats.map((s) => (
            <div key={s.label} style={styles.statCard}>
              <div style={styles.statLabel}>{s.label}</div>
              <div style={styles.statValue}>{s.value}</div>
              <div style={{ ...styles.statDelta, color: s.deltaColor }}>{s.delta} this week</div>
            </div>
          ))}
        </section>

        {/* Recent Applications */}
        <section style={styles.card}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>Recent Applications</h3>
            <button style={styles.button}>Export CSV</button>
          </div>

          <div style={styles.tableWrap as React.CSSProperties}>
  <table style={styles.table as React.CSSProperties}>

              <thead>
                <tr>
                  {["ID", "Candidate", "Role", "Type", "Status", "Applied On", "Actions"].map((h) => (
                    <th key={h} style={styles.th}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {applications.map((row) => (
                  <tr key={row.id} style={styles.rowHover}>
                    <td style={styles.td}>{row.id}</td>
                    <td style={styles.td}>{row.name}</td>
                    <td style={styles.td}>{row.role}</td>
                    <td style={styles.td}>{row.type}</td>
                    <td style={styles.td}>
                      <span style={pillStyles(row.status)}>{row.status}</span>
                    </td>
                    <td style={styles.td}>{row.date}</td>
                    <td style={styles.td}>
                      <button style={styles.viewBtn}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPanel;
