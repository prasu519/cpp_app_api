const electricalAreaService = require("../electricalarea/electricalarea.service");

const getElectricalAreas = async (req, res) => {
  try {
    const { equipmentType } = req.params;

    const electricalAreas = await electricalAreaService.getElectricalAreas(
      equipmentType
    );

    const result = electricalAreas.map((item) => ({
      label: item.areaName,
      value: item.areaId,
    }));

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getElectricalAreas,
};
