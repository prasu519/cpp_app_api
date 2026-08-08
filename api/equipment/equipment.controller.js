const equipmentService = require("../equipment/equipment.service");

const getEquipments = async (req, res) => {
  try {
    const { streamId } = req.params;

    const equipments = await equipmentService.getEquipments(streamId);

    const result = equipments.map((item) => ({
      label: item.equipmentName,
      value: item.equipmentId,
      type: item.type,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getEquipments,
};
