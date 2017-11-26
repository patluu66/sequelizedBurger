var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/", function(req, res) {
  res.redirect("/burger");
});

router.get("/burger", function(req, res) {
  db.Burger.findAll({
    include: [db.Customer],
    order: [
      ["burger_name", "ASC"]
    ]
  })
  .then(function(dbBurger) {
    var hbsObject = {
      burger: dbBurger
    };
    return res.render("index", hbsObject);
  });
});

router.post("/burger/create", function(req, res) {
  db.Burger.create({
    burger_name: req.body.burger_name
  })

  .then(function(dbBurger) {
    res.redirect("/");
  });
});

router.put("/burger/update", function(req, res) {
  if(req.body.customer) {
    db.Customer.create({
      customer: req.body.customer,
      BurgerId: req.body.burger_id
    })
    .then(function(dbCustomer) {
      return db.Burger.update({
        devoured: true
      }, {
        where: {
          id: req.body.burger_id
        }
      });
    })
    .then(function(dbBurger) {
      res.redirect("/");
    });
  } else {
    db.Burger.update({
      devoured: true
    }, {
      where: {
        id: req.body.burger_id
      }
    })
    .then(function(dbBurger) {
      res.redirect("/");
    });
  }
});


module.exports = router;






