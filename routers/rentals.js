const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
// const Fawn = require("fawn");
const express = require("express");
const router = express.Router();

Fawn.init("mongodb://127.0.0.1:27017/vidly");

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  try {
    rental.save();
    movie.numberInStock--;
    movie.save();
    // new Fawn.Task()
    //   .save("rentals", rental)
    //   .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
    //   .run();
    res.send(rental);
  } catch (ex) {
    res.status(500).send("Internal server error");
  }
});

// router.put("/:id", async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const rental = await Rental.findByIdAndUpdate(
//     req.params.id,
//     { name: req.body.name, amount: req.body.amount },
//     { new: true }
//   );
//   if (!rental) return res.status(404).send("Could not find the genre");

//   res.send(rental);
// });

// router.delete("/:id", async (req, res) => {
//   const rental = await Rental.findByIdAndRemove(req.params.id);
//   if (!rental) return res.status(404).send("Could not find the genre");

//   res.send(rental);
// });

router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental) return res.status(400).send("Genre not found");

  res.send(rental);
});

module.exports = router;
