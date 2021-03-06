const Quote = require('inspirational-quotes');
const db = require("../models");
// added package

// const passport = require("../config/");

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/motivate', (req, res) => {
    res.render('motivation');
  });

  app.get('/humor', (req, res) => {
    res.render('humor');
  });

  app.get('/surprise', (req, res) => {
    res.render('surprise');
  });

  app.get('/genre/:genre/:topic?', (req, res) => {
    const genreTable = req.params.genre;
    const findObj = {};
    if (req.params.topic) {
      findObj.where = {
        topic: req.params.topic,
      };
    }
    db[genreTable].findAll(findObj)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.post('/api/:genre', (req, res) => {
    const genreTable = req.params.genre;

    db[genreTable].create(req.body)
      .then((result) => {
        console.log(result);
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.get("/api/quotes", (req, res) => {
    const quote = Quote.getQuote();
    // console.log(quote);
    res.json(quote);
  });
};
