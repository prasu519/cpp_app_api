const instrumentationAreaService = require("../instrumentationarea/instrumentationarea.service");

const getInstrumentationAreas = async (req, res) => {
  try {
    const { equipmentType } = req.params;

    const instrumentationAreas =
      await instrumentationAreaService.getInstrumentationAreas(equipmentType);

    const result = instrumentationAreas.map((item) => ({
      label: item.areaName,
      value: item.areaId,
    }));

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getInstrumentationAreas,
};
