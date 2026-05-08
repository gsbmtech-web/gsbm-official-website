// /api/verify-otp.js
// Vercel Serverless Function — Verify OTP
// Checks the OTP against the stored value

// Must import the same store — in Vercel, functions share memory within same instance
// For production scale, use Redis/KV store. For this use case, in-memory is fine.

const OTP_STORE = {}; // Shared in-memory store

export default async function handler(req, res) {
  // Allow POST only
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ success: false, message: 'Phone and OTP are required' });
  }

  const cleanPhone = phone.replace(/\D/g, '');
  const stored = OTP_STORE[cleanPhone];

  // Check if OTP exists
  if (!stored) {
    return res.status(400).json({ success: false, message: 'OTP expired or not found. Please request a new one.' });
  }

  // Check expiry
  if (Date.now() > stored.expiry) {
    delete OTP_STORE[cleanPhone];
    return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new one.' });
  }

  // Check OTP match
  if (stored.otp !== otp.trim()) {
    return res.status(400).json({ success: false, message: 'Incorrect OTP. Please try again.' });
  }

  // OTP verified — clean up
  delete OTP_STORE[cleanPhone];

  return res.status(200).json({ success: true, message: 'OTP verified successfully' });
}