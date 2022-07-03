const router = require("express").Router();
let AccessPoint = require("../models/accessPoint");

router.route("/").get((req, res) => {
  AccessPoint.find()
    .then((accessPoint) => res.json(accessPoint))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const bssid = req.body.bssid;
  const x = req.body.x;
  const y = req.body.y;
  const floorLevel = req.body.floorLevel;
  const description = req.body.description;
  const newAccessPoint = new AccessPoint({
    bssid,
    x,
    y,
    floorLevel,
    description,
  });
  newAccessPoint
    .save()
    .then(() => res.json("access point added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  AccessPoint.findById(req.params.id)
    .then((accessPoint) => {
      accessPoint.bssid = req.body.bssid;
      accessPoint.x = req.body.x;
      accessPoint.y = req.body.y;
      accessPoint.floorLevel = req.body.floorLevel;
      accessPoint.description = req.body.description;
      client
        .save()
        .then(() => res.json("access point updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
