import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="pp-page">
      <div className="pp-container">
        <h1 className="pp-title">Privacy Policy</h1>
        <p className="pp-updated">Last updated: July 2026</p>

        <p className="pp-text">
          Ganesan School of Business Management (GSBM), under Vinayaka Mission's
          Research Foundation, respects your privacy. This policy explains how we
          handle information shared with us through our website and advertising forms.
        </p>

        <h2 className="pp-heading">Information We Collect</h2>
        <p className="pp-text">
          When you submit an inquiry or admissions form (including through LinkedIn
          or other ad platforms), we may collect your name, email address, phone
          number, and any details you choose to share regarding your educational or
          professional background.
        </p>

        <h2 className="pp-heading">How We Use It</h2>
        <p className="pp-text">
          We use this information solely to respond to your inquiry, provide details
          about our MBA programs, and follow up regarding admissions. We do not sell
          or rent your personal information to third parties.
        </p>

        <h2 className="pp-heading">Data Sharing</h2>
        <p className="pp-text">
          Your information may be shared internally within GSBM's admissions team
          and, where applicable, with Vinayaka Mission's Research Foundation for
          verification purposes. We do not share your data with unrelated third
          parties for marketing purposes.
        </p>

        <h2 className="pp-heading">Your Rights</h2>
        <p className="pp-text">
          You may request access to, correction of, or deletion of your personal
          data at any time by contacting us using the details below.
        </p>

        <h2 className="pp-heading">Contact Us</h2>
        <p className="pp-text">
          For any privacy-related questions, reach out to Team Admissions, GSBM
          at +91 86676 90672.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;