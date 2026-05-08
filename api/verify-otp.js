module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { phone, otp, token } = req.body;

  if (!phone || !otp || !token) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    const tokenData = Buffer.from(token, 'base64').toString('utf-8');
    const [tokenPhone, tokenOtp, tokenExpiry] = tokenData.split(':');
    const cleanPhone = phone.replace(/\D/g, '');

    if (tokenPhone !== cleanPhone) {
      return res.status(400).json({ success: false, message: 'Invalid OTP request.' });
    }
    if (Date.now() > parseInt(tokenExpiry)) {
      return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new one.' });
    }
    if (tokenOtp !== otp.trim()) {
      return res.status(400).json({ success: false, message: 'Incorrect OTP. Please try again.' });
    }

    return res.status(200).json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Verify error:', error);
    return res.status(400).json({ success: false, message: 'Invalid OTP. Please try again.' });
  }
};