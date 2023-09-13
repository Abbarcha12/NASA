const {habitablePlanets} = require("../../models/planet.model");


const getAllplanets = (req, res) => {
  return res.status(200).json(habitablePlanets);
  
  
};
module.exports = {
  getAllplanets,
};
