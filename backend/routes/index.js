const express =  require('express');
const { User } = require('../models')

const router = express.Router();

// routes go here
router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post('/:username', async (req, res) => {
  const user = req.body;
  const {username} = user;
  const response = await User.findOneAndUpdate({username: username}, user, {upsert: true, new: true})
  res.status(200).send(response);
})

module.exports = router;