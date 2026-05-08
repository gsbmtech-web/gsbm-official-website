// /api/send-otp.js
// Vercel Serverless Function — Send OTP via Pay4SMS
// This runs on the SERVER — API keys are never exposed to the browser

const OTP_STORE = {}; // In-memory store (resets on cold start — fine for OTP)

export default async function handler(req, res) {
  // Allow POST only
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { phone } = req.body;

  // Validate phone
  if (!phone || phone.replace(/\D/g, '').length !== 10) {
    return res.status(400).json({ success: false, message: 'Invalid phone number' });
  }

  const cleanPhone = phone.replace(/\D/g, '');

  // Generate 6-digit OTP
  const otp = String(Math.floor(100000 + Math.random() * 900000));

  // Store OTP with expiry (10 minutes)
  OTP_STORE[cleanPhone] = {
    otp,
    expiry: Date.now() + 10 * 60 * 1000, // 10 minutes
  };

  // Build message matching DLT template EXACTLY
  const message = `${otp} is your One Time Password (OTP) for AVIT. This OTP is valid till 10 mins - Team Admissions AVITEG`;

  // Call Pay4SMS API (server-side — no CORS issues!)
  const encodedMessage = encodeURIComponent(message);
  const apiUrl = `http://pay4sms.in/sendsms/?token=${process.env.PAY4SMS_TOKEN}&credit=4&sender=${process.env.PAY4SMS_SENDER}&message=${encodedMessage}&number=${cleanPhone}&templateid=${process.env.PAY4SMS_TEMPLATE_ID}`;

  try {
    const smsResponse = await fetch(apiUrl);
    const smsText = await smsResponse.text();

    console.log('Pay4SMS Response:', smsText);

    // Pay4SMS returns a numeric message ID on success
    if (smsText && !smsText.toLowerCase().includes('error')) {
      return res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } else {
      console.error('Pay4SMS Error:', smsText);
      return res.status(500).json({ success: false, message: 'Failed to send OTP. Please try again.' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
}