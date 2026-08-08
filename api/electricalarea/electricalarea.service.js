const ElectricalArea = require("../models/ElectricalAreaModel");

const getElectricalAreas = async (equipmentType) => {
  return await ElectricalArea.find(
    { equipmentType },
    {
      _id: 0,
      areaId: 1,
      areaName: 1,
    }
  ).sort({ areaName: 1 });
};

module.exports = {
  getElectricalAreas,
};
