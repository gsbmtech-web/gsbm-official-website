// ===== FILE: src/pages/ApplyNow.jsx =====
// Place this file at: src/pages/ApplyNow.jsx

const ApplyNow = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div style={styles.wrapper}>

      {/* Header */}
      <div style={styles.header}>
        <button onClick={handleBack} style={styles.backBtn}>
          ← Back to Website
        </button>
        <div style={styles.headerText}>
          <h1 style={styles.title}>MBA Program Application</h1>
          <p style={styles.subtitle}>GSBM Chennai — Admissions 2026-2028</p>
        </div>
      </div>

      {/* Form Container */}
      <div style={styles.formContainer}>
        <iframe
          // ⚠️ REPLACE THIS URL with your actual Zoho Form embed link
          // Get it from: Zoho Forms → Your Form → Share → Embed → Copy iframe src URL
          src="https://forms.zohopublic.in/gsbmtechgm1/form/GSBMChennaiMBAPROGRAM/formperma/TJrU6LXsWTqAWh5ZbxgeWMkmSW2-aK-lzoJ2xn3iEjQ"
          width="100%"
          height="900"
          frameBorder="0"
          style={styles.iframe}
          title="GSBM MBA Application Form"
          allow="geolocation"
        />
      </div>

      {/* Footer note */}
      <p style={styles.footerNote}>
        🔒 Your information is secure and will only be used for admissions purposes.
      </p>

    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Georgia, serif',
  },
  header: {
    backgroundColor: '#A0522D',
    padding: '20px 40px',
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    flexWrap: 'wrap',
  },
  backBtn: {
    backgroundColor: 'transparent',
    border: '1px solid rgba(255,255,255,0.6)',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    whiteSpace: 'nowrap',
  },
  headerText: {
    flex: 1,
  },
  title: {
    color: '#fff',
    margin: 0,
    fontSize: '24px',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.75)',
    margin: '4px 0 0',
    fontSize: '14px',
  },
  formContainer: {
    maxWidth: '860px',
    margin: '40px auto',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    padding: '10px',
  },
  iframe: {
    border: 'none',
    display: 'block',
    width: '100%',
  },
  footerNote: {
    textAlign: 'center',
    color: '#888',
    fontSize: '13px',
    paddingBottom: '40px',
  },
};

export default ApplyNow;