const InstrumentationArea = require("../models/InstrumentationAreaModel");

const getInstrumentationAreas = async (equipmentType) => {
  return await InstrumentationArea.find(
    { equipmentType },
    {
      _id: 0,
      areaId: 1,
      areaName: 1,
    }
  ).sort({ areaName: 1 });
};

module.exports = {
  getInstrumentationAreas,
};
