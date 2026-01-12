// Simple API endpoint - logs to console for now
// We'll add database later

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, city, income, frequency } = req.body;

  // Validate
  if (!email || !city) {
    return res.status(400).json({ error: 'Email and city required' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  // Calculate lead score
  let leadScore = 0;
  if (income === '1m+') leadScore += 30;
  else if (income === '500k-1m') leadScore += 20;
  else if (income === '250k-500k') leadScore += 10;
  
  if (frequency === 'weekly') leadScore += 25;
  else if (frequency === 'biweekly') leadScore += 15;
  else if (frequency === 'monthly') leadScore += 5;

  // For now, just log it
  console.log('NEW SIGNUP:', {
    timestamp: new Date().toISOString(),
    email,
    city,
    income,
    frequency,
    leadScore,
  });

  // Return success with random waitlist position (for demo)
  const waitlistPosition = Math.floor(Math.random() * 1000) + 1000;

  return res.status(200).json({
    success: true,
    waitlistPosition,
    message: 'Successfully joined waitlist!',
  });
}
