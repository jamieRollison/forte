const express =  require('express');

const router = express.Router();

// routes go here
router.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = router;