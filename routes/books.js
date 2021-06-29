var express = require("express");
var router = express.Router();
const dbConnection = require("../lib/db");

//Get Data Books
router.get("/", function (req, res, next) {
  dbConnection.query(
    "SELECT * FROM books ORDER BY id desc",
    function (err, rows) {
      if (err) {
        req.flash("Error", err);
        res.render("books", { data: "" });
      } else {
        res.render("books", { data: rows });
      }
    }
  );
});

//Add Page
router.get("/add", function (req, res, next) {
  res.render("books/add");
});

//Add Page
router.get("/edit", function (req, res, next) {
  res.render("books/edit");
});

module.exports = router;
