const sequelize = require("../db");
const { DataTypes } = require("sequelize");
//const { User } = require("./user-model");

const Token = sequelize.define("tokenuser", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },// ?НАверное можно убрать
  tokenuser: { type: DataTypes.INTEGER, defaultValue: null },
  refreshToken: { type: DataTypes.STRING },
});




module.exports = { Token };
