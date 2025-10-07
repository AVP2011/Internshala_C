// pages/postjob/index.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

const PostJob: React.FC = () => {
  const router = useRouter();
  const [formdata, setformdata] = useState({
    title: "",
    company: "",
    location: "",
    category: "",
    aboutCompany: "",
    aboutJob: "",
    responsibilities: "",
    qualifications: "",
    perks: "",
    openings: "",
    salary: "",
    startDate: "",
    duration: "",
    skills: "",
    applyLink: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("admin_auth") !== "1"
    ) {
      router.replace("/adminlogin");
    }
  }, [router]);

  const handlechange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setformdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Optional: Validate required fields
    if (!formdata.title || !formdata.company || !formdata.location) {
      toast.error(
        "Please fill in the required fields: Title, Company, Location"
      );
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post("https://internshala-c.onrender.com/api/job", formdata, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 201 || res.status === 200) {
        toast.success("Job posted successfully!");
        setformdata({
          title: "",
          company: "",
          location: "",
          category: "",
          aboutCompany: "",
          aboutJob: "",
          responsibilities: "",
          qualifications: "",
          perks: "",
          openings: "",
          salary: "",
          startDate: "",
          duration: "",
          skills: "",
          applyLink: "",
           
        });
        router.push("/adminpanel");
      } else {
        toast.error("Failed to post job.");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  // ✅ Properly typed styles using React.CSSProperties
  const styles: Record<string, React.CSSProperties> = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(180deg, #f7fbff 0%, #eef6ff 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily:
        "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    },
    card: {
      width: "100%",
      maxWidth: 720,
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 12px 30px rgba(2, 97, 163, 0.12)",
      border: "1px solid #e6eef6",
      padding: "32px",
      maxHeight: "90vh",
      overflowY: "auto",
    },
    title: { margin: 0, fontSize: 28, fontWeight: 800, color: "#0f172a" },
    subtitle: { marginTop: 6, fontSize: 14, color: "#64748b" },
    form: { marginTop: 24 },
    row: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16,
      marginTop: 16,
    },
    field: { marginTop: 16 },
    label: {
      display: "block",
      marginBottom: 6,
      fontSize: 13,
      fontWeight: 600,
      color: "#334155",
    },
    required: { color: "#ef4444" },
    input: {
      width: "100%",
      height: 44,
      border: "1px solid #dbe4ee",
      borderRadius: 10,
      padding: "0 12px",
      fontSize: 14,
      outline: "none",
      background: "#fff",
      color: "#0f172a",
      transition: "box-shadow .2s, border-color .2s",
      boxSizing: "border-box",
    },
    textarea: {
      width: "100%",
      minHeight: 100,
      border: "1px solid #dbe4ee",
      borderRadius: 10,
      padding: "10px 12px",
      fontSize: 14,
      outline: "none",
      background: "#fff",
      color: "#0f172a",
      transition: "box-shadow .2s, border-color .2s",
      boxSizing: "border-box",
      resize: "vertical", // ✅ FIXED: Removed 'as const'
      fontFamily: "inherit",
    },
    select: {
      width: "100%",
      height: 44,
      border: "1px solid #dbe4ee",
      borderRadius: 10,
      padding: "0 12px",
      fontSize: 14,
      outline: "none",
      background: "#fff",
      color: "#0f172a",
      transition: "box-shadow .2s, border-color .2s",
      boxSizing: "border-box",
      cursor: "pointer",
      appearance: "none", // 👍 Better cross-browser consistency
    },
    submitWrap: { marginTop: 28, display: "flex", gap: 12 },
    button: {
      height: 44,
      background: "#008bdc",
      color: "#fff",
      border: "none",
      borderRadius: 10,
      fontWeight: 700,
      cursor: "pointer",
      boxShadow: "0 10px 20px rgba(0,139,220,.15)",
      padding: "0 24px",
      flex: 1,
    },
    cancelButton: {
      height: 44,
      background: "#f1f5f9",
      color: "#475569",
      border: "none",
      borderRadius: 10,
      fontWeight: 600,
      cursor: "pointer",
      padding: "0 24px",
    },
  };

  return (
    <div style={styles.page}>
      <style>{`
        input::placeholder, textarea::placeholder { color: #94a3b8; }
        input:focus, textarea:focus, select:focus { box-shadow: 0 0 0 3px rgba(0,139,220,.15); }
      `}</style>
      <div style={styles.card}>
        <div>
          <h2 style={styles.title}>Post New Job</h2>
          <p style={styles.subtitle}>
            Fill in the details to create a new job opportunity
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div>
              <label htmlFor="title" style={styles.label}>
                Job Title <span style={styles.required}>*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formdata.title}
                onChange={handlechange}
                placeholder="e.g., Senior Backend Engineer"
                style={styles.input}
                required
              />
            </div>
            <div>
              <label htmlFor="company" style={styles.label}>
                Company Name <span style={styles.required}>*</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={formdata.company}
                onChange={handlechange}
                placeholder="e.g., Tech Innovators Inc."
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.row}>
            <div>
              <label htmlFor="location" style={styles.label}>
                Location <span style={styles.required}>*</span>
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={formdata.location}
                onChange={handlechange}
                placeholder="e.g., San Francisco, Remote"
                style={styles.input}
                required
              />
            </div>
            <div>
              <label htmlFor="category" style={styles.label}>
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formdata.category}
                onChange={handlechange}
                style={styles.select}
              >
                <option value="">Select category</option>
                <option value="engineering">Engineering</option>
                <option value="product">Product</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
                <option value="hr">HR</option>
                <option value="finance">Finance</option>
              </select>
            </div>
          </div>

          <div style={styles.field}>
            <label htmlFor="aboutCompany" style={styles.label}>
              About Company
            </label>
            <textarea
              id="aboutCompany"
              name="aboutCompany"
              value={formdata.aboutCompany}
              onChange={handlechange}
              placeholder="Brief description about the company..."
              style={styles.textarea}
            />
          </div>

          <div style={styles.field}>
            <label htmlFor="aboutJob" style={styles.label}>
              About the Job
            </label>
            <textarea
              id="aboutJob"
              name="aboutJob"
              value={formdata.aboutJob}
              onChange={handlechange}
              placeholder="Describe the role and its impact..."
              style={styles.textarea}
            />
          </div>

          <div style={styles.field}>
            <label htmlFor="responsibilities" style={styles.label}>
              Key Responsibilities
            </label>
            <textarea
              id="responsibilities"
              name="responsibilities"
              value={formdata.responsibilities}
              onChange={handlechange}
              placeholder="List main responsibilities, one per line..."
              style={styles.textarea}
            />
          </div>

          <div style={styles.field}>
            <label htmlFor="qualifications" style={styles.label}>
              Qualifications
            </label>
            <textarea
              id="qualifications"
              name="qualifications"
              value={formdata.qualifications}
              onChange={handlechange}
              placeholder="Required experience, education, etc."
              style={styles.textarea}
            />
          </div>

          <div style={styles.row}>
            <div>
              <label htmlFor="salary" style={styles.label}>
                Salary Range
              </label>
              <input
                id="salary"
                name="salary"
                type="text"
                value={formdata.salary}
                onChange={handlechange}
                placeholder="e.g., $80K - $120K"
                style={styles.input}
              />
            </div>
            <div>
              <label htmlFor="duration" style={styles.label}>
                Contract Duration
              </label>
              <input
                id="duration"
                name="duration"
                type="text"
                value={formdata.duration}
                onChange={handlechange}
                placeholder="e.g., Full-time, 6 months"
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.row}>
            <div>
              <label htmlFor="startDate" style={styles.label}>
                Start Date
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                value={formdata.startDate}
                onChange={handlechange}
                style={styles.input}
              />
            </div>
            <div>
              <label htmlFor="openings" style={styles.label}>
                Number of Openings
              </label>
              <input
                id="openings"
                name="openings"
                type="number"
                min="1"
                value={formdata.openings}
                onChange={handlechange}
                placeholder="e.g., 3"
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.field}>
            <label htmlFor="skills" style={styles.label}>
              Required Skills
            </label>
            <input
              id="skills"
              name="skills"
              type="text"
              value={formdata.skills}
              onChange={handlechange}
              placeholder="e.g., Node.js, AWS, TypeScript"
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label htmlFor="perks" style={styles.label}>
              Perks & Benefits
            </label>
            <input
              id="perks"
              name="perks"
              type="text"
              value={formdata.perks}
              onChange={handlechange}
              placeholder="e.g., Health insurance, WFH, Stock options"
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label htmlFor="applyLink" style={styles.label}>
              Application Link
            </label>
            <input
              id="applyLink"
              name="applyLink"
              type="url"
              value={formdata.applyLink}
              onChange={handlechange}
              placeholder="https://yourcompany.com/careers/apply"
              style={styles.input}
            />
          </div>

          <div style={styles.submitWrap}>
            <button type="submit" style={styles.button} disabled={isLoading}>
              {isLoading ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      borderTop: "2px solid #fff",
                      borderRight: "2px solid transparent",
                      borderBottom: "2px solid #fff",
                      borderLeft: "2px solid transparent",
                      borderRadius: "50%",
                      width: 16,
                      height: 16,
                      animation: "spin 1s linear infinite",
                    }}
                  ></div>
                  Posting...
                </div>
              ) : (
                "Post Job"
              )}
            </button>
            <style>{`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`}</style>

            <button
              type="button"
              style={styles.cancelButton}
              onClick={() => router.push("/adminpanel")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
