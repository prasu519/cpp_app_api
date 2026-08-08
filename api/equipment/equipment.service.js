const Equipment = require("../models/EquipmentsModel");

const getEquipments = async (streamId) => {
  return await Equipment.find(
    { streamId },
    {
      _id: 0,
      equipmentName: 1,
      equipmentId: 1,
      type: 1,
    }
  ).sort({ equipmentName: 1 });
};

module.exports = {
  getEquipments,
};
