const express = require('express');
const axios = require('axios');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PORT = 8081;

app.use(cors());
app.use(express.json());

let globalUser = null;
let keyData = {};

app.get('/callback', async (req, res) => {
  try {
    const { code } = req.query;

    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: '493552220595-5giqmfbhtfuuqudb08vsgft5mhc0hfir.apps.googleusercontent.com',
      client_secret: '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',
      redirect_uri: 'https://ballistic-half-jumper.glitch.me/callback',
      grant_type: 'authorization_code',
    });

    const accessToken = tokenResponse.data.access_token;
    const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const user = userInfoResponse.data;

    globalUser = user;

    res.redirect(`https://sabry134.github.io/marketing_dashboard/#/dashboard?token=${accessToken}`);
  } catch (error) {
    console.error('Error handling Google OAuth callback:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/get-keys', (req, res) => {
  const keys = Object.keys(keyData);
  res.json({ keys });
});

app.get('/user', (req, res) => {
  if (globalUser) {
    res.json(globalUser);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

const generateRandomKey = () => {
  return crypto.randomBytes(10).toString('hex');
};

app.get('/generate-key', (req, res) => {
  const randomKey = generateRandomKey();
  keyData[randomKey] = [];
  console.log('Generated Key:', randomKey);
  
  res.redirect(`https://sabry134.github.io/marketing_dashboard/#/settings?key=${randomKey}`);
});

app.get('/:key', (req, res) => {
  const key = req.params.key;
  if (keyData[key]) {
    res.json({ key, data: keyData[key] });
  } else {
    res.status(404).json({ error: 'Invalid key' });
  }
});



app.post('/:key', (req, res) => {
  const key = req.params.key;
  const postData = req.body;

  if (keyData[key]) {
    keyData[key].push(postData);
    res.json({ message: 'Data added successfully', key, data: keyData[key] });
  } else {
    res.status(404).json({ error: 'Invalid key' });
  }
});

app.delete('/:key', (req, res) => {
  const key = req.params.key;

  if (keyData[key]) {
    delete keyData[key];
    res.json({ message: 'Data deleted successfully', key });
  } else {
    res.status(404).json({ error: 'Invalid key' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
