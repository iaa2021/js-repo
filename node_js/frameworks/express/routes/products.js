 const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Products home route');
});

module.exports = router;