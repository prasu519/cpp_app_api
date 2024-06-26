const EmployeDetails = require("../models/EmployeDetails");

module.exports = {
  employeDetailsService: async (data, callback) => {
    try {
      const addEmployeDetails = new EmployeDetails(data);
      await addEmployeDetails.save();
      return callback(null, addEmployeDetails);
    } catch (error) {
      return callback(error);
    }
  },
  employeDetailsServiceRead: async (empnum, callback) => {
    try {
      const getEmployeDetails = await EmployeDetails.find({
        empnum: empnum,
      });
      return callback(null, getEmployeDetails);
    } catch (error) {
      return callback(error);
    }
  },
};
