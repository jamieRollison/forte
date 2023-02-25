const express = require('express');
const cors = require('cors');
const router = require('./routes/index.js');

async function start() {
  const app = express();
  app.use(cors());

  app.use(express.json());

  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });

  app.use('/api', router);
}

start();