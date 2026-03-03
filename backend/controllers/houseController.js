const House = require("../models/House");

// CREATE
exports.createHouse = async (req, res) => {
  try {
    const house = await House.create(req.body);
    res.status(201).json(house);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET
exports.getHouses = async (req, res) => {
  try {
    const { location, minPrice, maxPrice } = req.query;

    let query = {};

    // Search by location
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // Filter by price
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const houses = await House.find(query);

    res.json({ houses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
exports.updateHouse = async (req, res) => {
  try {
    const updatedHouse = await House.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedHouse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
exports.deleteHouse = async (req, res) => {
  try {
    await House.findByIdAndDelete(req.params.id);
    res.json({ message: "House deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};