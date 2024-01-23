const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 8081;

app.use(cors());

let globalUser = null;

app.get('/callback', async (req, res) => {
  try {
    const { code } = req.query;

    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: '493552220595-5giqmfbhtfuuqudb08vsgft5mhc0hfir.apps.googleusercontent.com',
      client_secret: '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',
      redirect_uri: 'http://localhost:8081/callback',
      grant_type: 'authorization_code',
    });

    const accessToken = tokenResponse.data.access_token;
    const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const user = userInfoResponse.data;

    globalUser = user;

    res.redirect(`http://localhost:8080/#/dashboard?token=${accessToken}`);
  } catch (error) {
    console.error('Error handling Google OAuth callback:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/user', (req, res) => {
  if (globalUser) {
    res.json(globalUser);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
