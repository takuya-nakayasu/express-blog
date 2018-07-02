var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('mydb.sqlite3');

/* GET home page. */
router.get('/', (req, res, next) => {
  db.serialize(() => {
    db.all('select * from post', (err, rows) => {
      if (!err) {
        res.render('index', { posts: rows });
      }
    });
  });
});

module.exports = router;
