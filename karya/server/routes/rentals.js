const express = require("express");
const Rental = require("../models/rental");
const userCtrl = require('../controllers/users')

const router = express.Router();

router.get("/secret", userCtrl.authMiddleware, function(req, res){
  res.json({secret: true});
});

router.get("", function(req, res) {
  try {
    console.log("searching rentas")
    Rental.find({}, function(err, rentals) {
      res.json(rentals);
    });
  } catch (e) {
    console.log("error occured " + e);
  }
});

router.get("/:id", function(req, res) {
  try {
    const rentalId = req.params.id;
    console.log("searching rental with id" + rentalId)
    Rental.findById(rentalId, function(err, rental) {
      if (rental == null) {
        res.status(404).send({
          errors: [
            {
              title: "Rental Error",
              detail: "Rental Not found "
            }
          ]
        });
      } else {
        res.json(rental);
      }
    });
  } catch (e) {
    console.log("error occured " + e);
  }
});

module.exports = router;
