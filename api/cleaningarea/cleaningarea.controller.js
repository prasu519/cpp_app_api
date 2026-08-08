const cleaningAreaService = require("../cleaningarea/cleaningarea.service");

const getCleaningAreas = async (req, res) => {
  try {
    const { equipmentType } = req.params;

    const cleaningAreas = await cleaningAreaService.getCleaningAreas(
      equipmentType
    );

    const result = cleaningAreas.map((item) => ({
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
  getCleaningAreas,
};
