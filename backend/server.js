const express =  require('express');
const cors = require('cors');
const router = require('./routes/index.js');
const { Auth } = require('./models')

const mongoose = require('mongoose');
require('dotenv').config();

async function start() {
  const app = express();
  app.use(cors());

  app.use(express.json());
  
  mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  

  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });

  app.use('/api', router);
}

start();