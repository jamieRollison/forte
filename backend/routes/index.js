import express from 'express';

export const router = express.Router();

// routes go here
router.get('/', (req, res) => {
  res.send('Hello World!');
});

export default router;