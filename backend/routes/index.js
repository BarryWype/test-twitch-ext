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
      console.log(summary);
      res.end(JSON.stringify({ a: summary }));
    });
  }).catch(() => {
    res.end(JSON.stringify({ a: "error" }));
  });
});

router.get('/apps', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  steam.resolve('https://steamcommunity.com/profiles/76561198020613214/').then(id => {
    console.log(id);
    steam.getUserOwnedGames(id).then(apps => {
      console.log(apps);
      res.end(JSON.stringify({ res: apps }));
    })
  }).catch(() => {
    res.end(JSON.stringify({ a: "error" }));
  });
});

router.get('/achivement', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  steam.resolve('https://steamcommunity.com/profiles/76561198020613214/').then(id => {
    console.log(id);
    steam.get(`/ISteamUserStats/GetPlayerAchievements/v1?steamid=${id}&appid=${req.query.appId}&l=french`).then(success => {
      console.log(success);
      res.end(JSON.stringify({ res: success }));
    })
  }).catch(() => {
    res.end(JSON.stringify({ a: "error" }));
  });
});

router.get('/game', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  steam.resolve('https://steamcommunity.com/profiles/76561198020613214/').then(id => {
    console.log(id);
    steam.getGameSchema(req.query.appId).then(success => {
      console.log(success);
      res.end(JSON.stringify({ res: success }));
    })
  }).catch(() => {
    res.end(JSON.stringify({ a: "error" }));
  });
});


module.exports = router;
