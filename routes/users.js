var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
const cors = require('cors');
router.use(cors());

// GET USER ROUTER LISTENING
router.get('/', function(req, res, next) {
  res.send("Router is listening");
});

// SEND PRODUCT CATEGORIES TO CLIENT
router.get('/categories', (req, res) => {
  let sql = `SELECT productLine FROM productlines`;

  req.app.locals.con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    };

    res.json(result);
  });
});

// SEND CORRECT PRODUCTS TO CLIENT
router.post('/products', (req, res) => {
  let category = req.body.categoryId;
  let sql = `SELECT productName FROM products WHERE productLine = "${category}"`;

  req.app.locals.con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    };
    
    res.json(result);
  });
});

// SEND OFFICES TO CLIENT
router.get('/contact', function(req, res, next) {
  req.app.locals.con.connect(function(err) {
    if (err) {
      console.log(err);
    };

    let sql = `SELECT * FROM offices`;

    req.app.locals.con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      };

      res.json(result);
    });
  });
});

// SEND CORRECT EMPLOYEES TO CLIENT
router.post('/officeInfo', (req, res) => {
  let office = req.body.officeId;

  let sql = `SELECT * FROM employees WHERE officeCode = "${office}"`;
  req.app.locals.con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    };

    res.json(result);
  });
});

module.exports = router;
