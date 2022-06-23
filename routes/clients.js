const router = require("express").Router();
let Client = require("../models/client");

router.route("/").get((req, res) => {
  Client.find()
    .then((clients) => res.json(clients))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const mac = req.body.mac;
  const newClient = new Client({ name, mac });
  newClient
    .save()
    .then(() => res.json("client added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
