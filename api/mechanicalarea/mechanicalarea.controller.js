const mechanicalAreaService = require("../mechanicalarea/mechanicalarea.service");

const getMechanicalAreas = async (req, res) => {
  try {
    const { equipmentType } = req.params;

    const mechanicalAreas = await mechanicalAreaService.getMechanicalAreas(
      equipmentType
    );

    const result = mechanicalAreas.map((item) => ({
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
  getMechanicalAreas,
};
