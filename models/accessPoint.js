const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccessPointSchema = new Schema(
  {
    bssid: { type: String, required: true },
    x: { type: String, required: true },
    y: { type: String, required: true },
    floorLevel: { type: String, required: true },
    description: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const AccessPoint = mongoose.model("AccessPoints", AccessPointSchema);

module.exports = AccessPoint;
