var express = require("express");
const { request } = require("../app");
var router = express.Router();
const dbConnection = require("../lib/db");

//Get Data Books
router.get("/", function (req, res, next) {
  dbConnection.query(
    "SELECT * FROM books ORDER BY id desc",
    function (err, rows) {
      if (err) {
        req.flash("error", err);
        res.render("books", { data: "" });
      } else {
        res.render("books", { data: rows });
      }
    }
  );
});

//Send Data to Display after Add
router.get("/add", function (req, res, next) {
  res.render("books/add", {
    name: "",
    author: "",
  });
});

//Add Data Books Function
router.post("/add", function (req, res, next) {
  let name = req.body.name;
  let author = req.body.author;
  let errors = false;

  if (name.length === 0 || author.length === 0) {
    errors = true;
    // Message Error
    req.flash("error", "Please enter name and author");
    // In Page Books Add
    res.render("books/add", {
      name: name,
      author: author,
    });
  }

  if (!errors) {
    var form_data = {
      name: name,
      author: author,
    };
    dbConnection.query(
      "INSERT INTO books set ?",
      form_data,
      function (err, result) {
        if (err) {
          // Get Error
          req.flash("error", err);
          // In Page Books Add
          res.render("books/add", {
            name: form_data.name,
            author: form_data.author,
          });
        } else {
          req.flash("success", "Book Successfully Added");
          res.redirect("/books");
        }
      }
    );
  }
});

//Get id To update Books
router.get("/edit/(:id)", function (req, res, next) {
  let id = req.params.id;

  dbConnection.query(
    "SELECT * FROM books WHERE id =" + id,
    function (err, rows, fields) {
      if (err) throw err;

      //If Data Not Found
      if (rows.length <= 0) {
        req.flash("error", "Books not Found with id =" + id);
        res.redirect("/books");
      } else {
        res.render("books/edit", {
          title: "Edit Book",
          id: rows[0].id,
          name: rows[0].name,
          author: rows[0].author,
        });
      }
    }
  );
});

// Update Books
router.post("/update/:id", function (req, res, next) {
  let id = req.params.id;
  let name = req.body.name;
  let author = req.body.author;
  let errors = false;

  if (name.length === 0 || author.length === 0) {
    errors = true;
    // Message Error
    req.flash("error", "Please enter name and author");
    // In Page Books Add
    res.render("books/edit", {
      id: req.params.id,
      name: name,
      author: author,
    });
  }
  if (!errors) {
    var form_data = {
      name: name,
      author: author,
    };
    dbConnection.query(
      "UPDATE books set ? WHERE id = " + id,
      form_data,
      function (err, result) {
        if (err) {
          // Get Error
          req.flash("error", err);
          // In Page Books Update
          res.render("books/update", {
            id: req.params.id,
            name: form_data.name,
            author: form_data.author,
          });
        } else {
          req.flash("success", "Book Successfully Added");
          res.redirect("/books");
        }
      }
    );
  }
});

// Delete Book
router.get("/delete/(:id)", function (req, res, next) {
  let id = req.params.id;
  dbConnection.query(
    "DELETE FROM books WHERE id =" + id,
    function (err, result) {
      if (err) {
        req.flash("error", err);
        res.redirect("/books");
      } else {
        req.flash("success", "Books Successfully Deleted id =" + id);
        res.redirect("/books");
      }
    }
  );
});

module.exports = router;
