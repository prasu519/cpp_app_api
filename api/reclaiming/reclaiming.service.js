const pool = require("../../cofig/database");

module.exports = {
  reclaimingService: (data, callback) => {
    pool.query(
      `insert into reclaiming(coal_name,reclaiming) values(?,?)`,
      [data.coal_name, data.reclaiming],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
