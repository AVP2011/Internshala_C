// pages/settings/index.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const AdminSettings: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('admin_auth') !== '1') {
      router.replace('/adminlogin');
    }
  }, [router]);

  const styles = {
    page: {
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f7fbff 0%, #eef6ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    },
    card: {
      width: '100%',
      maxWidth: 600,
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 12px 30px rgba(2, 97, 163, 0.12)',
      border: '1px solid #e6eef6',
      padding: '32px',
      textAlign: 'center' as const,
    },
    title: { margin: 0, fontSize: 28, fontWeight: 800, color: '#0f172a' },
    subtitle: { marginTop: 6, fontSize: 14, color: '#64748b' },
    button: {
      marginTop: 24,
      height: 44,
      background: '#008bdc',
      color: '#fff',
      border: 'none',
      borderRadius: 10,
      fontWeight: 700,
      cursor: 'pointer',
      boxShadow: '0 10px 20px rgba(0,139,220,.15)',
      padding: '0 24px',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Settings</h2>
        <p style={styles.subtitle}>Coming soon! Configure roles, permissions, and platform settings.</p>
        <button
          style={styles.button}
          onClick={() => router.push('/adminpanel')}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#0079c2')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#008bdc')}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;