const { Sequelize } = require("sequelize");

const db = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "2123",
  database: "users-repairs",
  logging: false,
});

module.exports = { db };
