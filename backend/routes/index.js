import express from 'express';
const { client_id, client_secret } = require('../spotify-credentials.js');
import request from 'request';

export const router = express.Router();

const generateToken = async () => {
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  return request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      return body.access_token;
    }
  });

}

const access_token = await generateToken();


// routes go here
router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.get('/search', (req, res) => {
  const { q } = req.query;
  const options = {
    url: `https://api.spotify.com/v1/search?q=${q}&type=track`,
    headers: {
      Authorization: `Bearer ${access_token}`
    },
  }
  request.get(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  });
});

export default router;