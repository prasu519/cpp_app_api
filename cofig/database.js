const { createPool } = require("mysql");

const pool = createPool({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "04131Aa0519#",
  database: "cpp_app",
  connectionLimit: 10,
});

module.exports = pool;
