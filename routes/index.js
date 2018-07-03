var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('mydb.sqlite3');

/* GET home page. */
router.get('/', (req, res, next) => {
  db.serialize(() => {
    db.all('select * from post', (err, rows) => {
      if (!err && rows) {
        // 改行コードを<br>に変換
        const newRows = rows.map(row => {
          if (row.content) {
            row.content = row.content.replace(/\r?\n/g, '<br>');
          }
          return row;
        });
        console.log(newRows);
        res.render('index', { posts: newRows });
      }
    });
  });
});

module.exports = router;
