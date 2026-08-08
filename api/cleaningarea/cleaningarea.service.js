const CleaningArea = require("../models/CleaningAreaModel");

const getCleaningAreas = async (equipmentType) => {
  return await CleaningArea.find(
    { equipmentType },
    {
      _id: 0,
      areaId: 1,
      areaName: 1,
    }
  ).sort({ areaName: 1 });
};

module.exports = {
  getCleaningAreas,
};
