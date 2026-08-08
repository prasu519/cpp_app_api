const MechanicalArea = require("../models/MechanicalAreaModel");

const getMechanicalAreas = async (equipmentType) => {
  return await MechanicalArea.find(
    { equipmentType },
    {
      _id: 0,
      areaId: 1,
      areaName: 1,
    }
  ).sort({ areaName: 1 });
};

module.exports = {
  getMechanicalAreas,
};
