const express = require("express");
const router = express.Router();

const {
  createHouse,
  getHouses,
  updateHouse,
  deleteHouse
} = require("../controllers/houseController");

// NO protect middleware now

router.post("/", createHouse);
router.get("/", getHouses);
router.put("/:id", updateHouse);
router.delete("/:id", deleteHouse);

module.exports = router;