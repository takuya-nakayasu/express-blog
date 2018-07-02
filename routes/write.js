var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('mydb.sqlite3');

router.get('/', (req, res, next) => res.render('write'));

router.post('/', (req, res, next) => {
    console.log('dbb');
    console.log(db);
    const title = req.body.title;
    const content = req.body.content;
    const createdtime = new Date();
    db.run(
        'insert into post (title, content, createdtime) values (?, ?, ?)',
        title,
        content,
        createdtime
    );
    res.redirect('/');
});

module.exports = router;