const express = require("express");
const rp = require("request-promise");
const parseString = require("xml2js").parseString;
const authorizate = require("../utils/authorizate").authorizate;
const router = express.Router();

router.get("/search", authorizate, (req, res) => {
  rp(
    `https://www.goodreads.com/search/index.xml?key=${
      process.env.GOODREADS_KEY
    }&q=${req.query.q}`
  ).then(result => {
    parseString(result, (err, goodreadsResult) =>
      res.json({
        books: goodreadsResult.GoodreadsResponse.search[0].results[0].work.map(
          work => ({
            goodreadsId: work.best_book[0].id[0]._,
            title: work.best_book[0].title[0],
            author: work.best_book[0].author[0].name[0],
            covers: [work.best_book[0].image_url[0]]
          })
        )
      })
    );
  });
});

router.get("/fetchPage", authorizate, (req, res) => {
  rp(
    `https://www.goodreads.com/book/show.xml?key=${
      process.env.GOODREADS_KEY
    }&id=${req.query.goodreadsId}`
  ).then(result => {
    parseString(result, (err, goodreadsResult) => {
      const numPage = goodreadsResult.GoodreadsResponse.book[0].num_pages[0];
      const page = numPage ? parseInt(numPage, 10) : 0;
      res.json({ page });
    });
  });
});

module.exports = router;
