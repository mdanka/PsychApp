var express = require('express');
var router = express.Router();
var db = require('../queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/meditations', db.getAllMeditationEntries);
router.get('/api/meditations/export.csv', db.exportAllMeditationEntries);
router.get('/api/meditations/:id', db.getSingleMeditationEntry);
router.post('/api/meditations', db.createMeditationEntry);


module.exports = router;
