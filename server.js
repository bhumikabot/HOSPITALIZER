const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// API endpoint for hospitals
app.get('/api/hospitals', (req, res) => {
  try {
    const hospitals = require('./hospitals.js').hospitals || [];
    res.json(hospitals);
  } catch (err) {
    res.status(500).json({ error: 'Could not load hospitals' });
  }
});

app.use(express.json());
// Basic user login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !email.endsWith('@gmail.com') || !password || password.length < 8) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }
  // Demo: always succeed
  res.json({ success: true, email });
});

app.listen(PORT, () => {
  console.log(`Hospitalizer backend running on http://localhost:${PORT}`);
});
