export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

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

  // Message matching NEW DLT template exactly
  const message = `Please verify your Mobile on GSBM OTP is ${otp} this OTP Valid for next 10 Mints Team Admissions. Ganesan School of Business Management`;
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
}