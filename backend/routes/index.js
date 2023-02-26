const express = require('express');
const request = require('request');
require('dotenv').config();

const router = express.Router();

const generateToken = async () => {
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(process.env.client_id + ':' + process.env.client_secret).toString('base64'))
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

const access_token = generateToken().then((token) => token);

// routes go here
router.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = router;