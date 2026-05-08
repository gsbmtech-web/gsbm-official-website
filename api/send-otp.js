module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { phone } = req.body;

  if (!phone || phone.replace(/\D/g, '').length !== 10) {
    return res.status(400).json({ success: false, message: 'Invalid phone number' });
  }

  const cleanPhone = phone.replace(/\D/g, '');
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  const expiry = Date.now() + 10 * 60 * 1000;
  const tokenData = `${cleanPhone}:${otp}:${expiry}`;
  const token = Buffer.from(tokenData).toString('base64');

  const message = `${otp} is your One Time Password (OTP) for AVIT. This OTP is valid till 10 mins - Team Admissions AVITEG`;
  const encodedMessage = encodeURIComponent(message);
  const apiUrl = `http://pay4sms.in/sendsms/?token=${process.env.PAY4SMS_TOKEN}&credit=4&sender=${process.env.PAY4SMS_SENDER}&message=${encodedMessage}&number=${cleanPhone}&templateid=${process.env.PAY4SMS_TEMPLATE_ID}`;

  try {
    const smsResponse = await fetch(apiUrl);
    const smsText = await smsResponse.text();
    console.log('Pay4SMS Response:', smsText);

    if (smsText && !smsText.toLowerCase().includes('error')) {
      return res.status(200).json({ success: true, token, message: 'OTP sent successfully' });
    } else {
      console.error('Pay4SMS Error:', smsText);
      return res.status(500).json({ success: false, message: 'Failed to send OTP. Please try again.' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};