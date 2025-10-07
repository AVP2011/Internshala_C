// pages/postinternship/index.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from "react-toastify";
import axios from 'axios';

interface InternshipForm {
  title: string;
  company: string;
  location: string;
  category: string;
  aboutCompany: string;
  aboutInternship: string;
  whoCanApply: string;
  perks: string;
  numberOfOpening: string;
  stipend: string;
  startDate: string;
  duration: string;
  skills: string;
  additionalInfo: string;
}

const PostInternship: React.FC = () => {
  const router = useRouter();
  const [formdata, setformdata] = useState<InternshipForm>({
    title: '',
    company: '',
    location: '',
    category: '',
    aboutCompany: '',
    aboutInternship: '',
    whoCanApply: '',
    perks: '',
    numberOfOpening: '',
    stipend: '',
    startDate: '',
    duration: '',
    skills: '',
    additionalInfo: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // 🔐 Admin auth guard
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('admin_auth') !== '1') {
      router.replace('/adminlogin');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setformdata(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formdata.title || !formdata.company || !formdata.location) {
      toast.error("Please fill in the required fields: Title, Company, Location");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:5000/api/internship", formdata, {
        headers: { "Content-Type": "application/json" }
      });

      if (res.status === 200 || res.status === 201) {
        toast.success("Internship posted successfully!");
        // Reset form
        setformdata({
          title: '',
          company: '',
          location: '',
          category: '',
          aboutCompany: '',
          aboutInternship: '',
          whoCanApply: '',
          perks: '',
          numberOfOpening: '',
          stipend: '',
          startDate: '',
          duration: '',
          skills: '',
          additionalInfo: ''
        });
        router.push("/adminpanel");
      } else {
        toast.error("Failed to post internship.");
      }
    } catch (error: any) {
      console.error("Internship submission error:", error.response || error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const styles: Record<string, React.CSSProperties> = {
    page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'linear-gradient(180deg, #f7fbff 0%, #eef6ff 100%)', fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif' },
    card: { width: '100%', maxWidth: 720, background: '#fff', borderRadius: 16, boxShadow: '0 12px 30px rgba(2, 97, 163, 0.12)', border: '1px solid #e6eef6', padding: 32, maxHeight: '90vh', overflowY: 'auto' },
    title: { margin: 0, fontSize: 28, fontWeight: 800, color: '#0f172a' },
    subtitle: { marginTop: 6, fontSize: 14, color: '#64748b' },
    form: { marginTop: 24 },
    row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 },
    field: { marginTop: 16 },
    label: { display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, color: '#334155' },
    required: { color: '#ef4444' },
    input: { width: '100%', height: 44, border: '1px solid #dbe4ee', borderRadius: 10, padding: '0 12px', fontSize: 14, outline: 'none', background: '#fff', color: '#0f172a', boxSizing: 'border-box', transition: 'box-shadow .2s, border-color .2s' },
    textarea: { width: '100%', minHeight: 100, border: '1px solid #dbe4ee', borderRadius: 10, padding: '10px 12px', fontSize: 14, outline: 'none', background: '#fff', color: '#0f172a', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box', transition: 'box-shadow .2s, border-color .2s' },
    select: { width: '100%', height: 44, border: '1px solid #dbe4ee', borderRadius: 10, padding: '0 12px', fontSize: 14, outline: 'none', background: '#fff', color: '#0f172a', boxSizing: 'border-box', cursor: 'pointer', transition: 'box-shadow .2s, border-color .2s' },
    submitWrap: { marginTop: 28, display: 'flex', gap: 12 },
    button: { height: 44, background: '#008bdc', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,139,220,.15)', padding: '0 24px', flex: 1 },
    cancelButton: { height: 44, background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 10, fontWeight: 600, cursor: 'pointer', padding: '0 24px' }
  };

  return (
    <div style={styles.page}>
      <style>{`
        input::placeholder, textarea::placeholder { color: #94a3b8; }
        input:focus, textarea:focus, select:focus { box-shadow: 0 0 0 3px rgba(0,139,220,.15); }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
      <div style={styles.card}>
        <h2 style={styles.title}>Post New Internship</h2>
        <p style={styles.subtitle}>Fill in the details to create a new internship opportunity</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div>
              <label htmlFor="title" style={styles.label}>Internship Title <span style={styles.required}>*</span></label>
              <input id="title" name="title" type="text" value={formdata.title} onChange={handleChange} placeholder="Frontend Developer Intern" style={styles.input} required />
            </div>

            <div>
              <label htmlFor="company" style={styles.label}>Company Name <span style={styles.required}>*</span></label>
              <input id="company" name="company" type="text" value={formdata.company} onChange={handleChange} placeholder="Tech Corp" style={styles.input} required />
            </div>
          </div>

          <div style={styles.row}>
            <div>
              <label htmlFor="location" style={styles.label}>Location <span style={styles.required}>*</span></label>
              <input id="location" name="location" type="text" value={formdata.location} onChange={handleChange} placeholder="Remote, New York" style={styles.input} required />
            </div>

            <div>
              <label htmlFor="category" style={styles.label}>Category</label>
              <select id="category" name="category" value={formdata.category} onChange={handleChange} style={styles.select}>
                <option value="">Select category</option>
                <option value="engineering">Engineering</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
                <option value="hr">HR</option>
                <option value="finance">Finance</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div style={styles.field}>
            <label htmlFor="aboutCompany" style={styles.label}>About Company</label>
            <textarea id="aboutCompany" name="aboutCompany" value={formdata.aboutCompany} onChange={handleChange} placeholder="Brief description..." style={styles.textarea} />
          </div>

          <div style={styles.field}>
            <label htmlFor="aboutInternship" style={styles.label}>About the Internship</label>
            <textarea id="aboutInternship" name="aboutInternship" value={formdata.aboutInternship} onChange={handleChange} placeholder="Role and responsibilities..." style={styles.textarea} />
          </div>

          <div style={styles.field}>
            <label htmlFor="whoCanApply" style={styles.label}>Who Can Apply</label>
            <textarea id="whoCanApply" name="whoCanApply" value={formdata.whoCanApply} onChange={handleChange} placeholder="Eligibility criteria..." style={styles.textarea} />
          </div>

          <div style={styles.row}>
            <div>
              <label htmlFor="stipend" style={styles.label}>Stipend</label>
              <input id="stipend" name="stipend" type="text" value={formdata.stipend} onChange={handleChange} placeholder="$500/month or Unpaid" style={styles.input} />
            </div>

            <div>
              <label htmlFor="duration" style={styles.label}>Duration</label>
              <input id="duration" name="duration" type="text" value={formdata.duration} onChange={handleChange} placeholder="3 months" style={styles.input} />
            </div>
          </div>

          <div style={styles.row}>
            <div>
              <label htmlFor="startDate" style={styles.label}>Start Date</label>
              <input id="startDate" name="startDate" type="date" value={formdata.startDate} onChange={handleChange} style={styles.input} />
            </div>

            <div>
              <label htmlFor="numberOfOpening" style={styles.label}>Number of Openings</label>
              <input id="numberOfOpening" name="numberOfOpening" type="number" min="1" value={formdata.numberOfOpening} onChange={handleChange} placeholder="5" style={styles.input} />
            </div>
          </div>

          <div style={styles.field}>
            <label htmlFor="skills" style={styles.label}>Required Skills</label>
            <input id="skills" name="skills" type="text" value={formdata.skills} onChange={handleChange} placeholder="JavaScript, React, Node.js" style={styles.input} />
          </div>

          <div style={styles.field}>
            <label htmlFor="perks" style={styles.label}>Perks</label>
            <input id="perks" name="perks" type="text" value={formdata.perks} onChange={handleChange} placeholder="Certificate, Recommendation, Flexible hours" style={styles.input} />
          </div>

          <div style={styles.field}>
            <label htmlFor="additionalInfo" style={styles.label}>Additional Information</label>
            <textarea id="additionalInfo" name="additionalInfo" value={formdata.additionalInfo} onChange={handleChange} placeholder="Any other relevant info..." style={styles.textarea} />
          </div>

          <div style={styles.submitWrap}>
            <button type="submit" style={styles.button} disabled={isLoading}>
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <div style={{ borderTop: '2px solid #fff', borderRight: '2px solid transparent', borderBottom: '2px solid #fff', borderLeft: '2px solid transparent', borderRadius: '50%', width: 16, height: 16, animation: 'spin 1s linear infinite' }}></div>
                  Posting...
                </div>
              ) : "Post Internship"}
            </button>

            <button type="button" style={styles.cancelButton} onClick={() => router.push("/adminpanel")}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostInternship;
