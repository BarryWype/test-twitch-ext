const express = require('express')
const router = express.Router()
const twitch = require('../service/twitch')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  res.json(twitch.colorCycleHandler(req))
});

module.exports = router
