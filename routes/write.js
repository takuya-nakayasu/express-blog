var express = require('express');
var router = express.Router();
// sqlite3モジュールのインポート
var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('mydb.sqlite3');
// /write にgetメソッドでリクエストすると、write.ejsをレンダリング
router.get('/', (req, res, next) => res.render('write'));

// /write にpostメソッドでリクエストした時の処理
router.post('/', (req, res, next) => {
    // 投稿画面のフォームからタイトルと本文を取得
    const title = req.body.title;
    const content = req.body.content;
    // 投稿日付を取得
    const createdtime = new Date();
    // 投稿記事をDBにinsertする
    db.run(
        'insert into post (title, content, createdtime) values (?, ?, ?)',
        title,
        content,
        createdtime
    );
    // ホーム画面(index.ejs)にリダイレクト
    res.redirect('/');
});

module.exports = router;