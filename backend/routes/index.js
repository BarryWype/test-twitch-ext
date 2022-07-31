const express = require('express')
const router = express.Router()
const twitch = require('../service/twitch')
const SteamAPI = require('steamapi');
const steam = new SteamAPI('99C5FC93E5666087F61A95A483B4416C');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  res.json(twitch.colorCycleHandler(req))
});

router.get('/user', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  steam.resolve(req.query.urlSteamProfil).then(id => {
    console.log(id);
    steam.getUserSummary(id).then(summary => {
      res.end(JSON.stringify({ res: summary }));
    });
  }).catch(() => {
    res.end(JSON.stringify({ res: "error" }));
  });
});

router.get('/apps', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  steam.getUserOwnedGames(req.query.steamID).then(apps => {
    res.end(JSON.stringify({ res: apps }));
  }).catch(() => {
    res.end(JSON.stringify({ res: "error" }));
  });
});

router.get('/achivement', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  steam.get(`/ISteamUserStats/GetPlayerAchievements/v1?steamid=${req.query.steamID}&appid=${req.query.appID}&l=french`).then(success => {
    res.end(JSON.stringify({ res: success.playerstats.achievements }));
  }).catch(() => {
    res.end(JSON.stringify({ res: "error" }));
  });
});

router.get('/game', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  steam.getGameSchema(req.query.appID).then(success => {
    res.end(JSON.stringify({ res: success }));
  }).catch(() => {
    res.end(JSON.stringify({ res: "error" }));
  });
});


module.exports = router;
