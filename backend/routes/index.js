const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ a: 1 }));
});

module.exports = router;
