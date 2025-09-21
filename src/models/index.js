const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('beejee', 'postgres', '123', {
  host: 'localhost',
  dialect: 'postgres',
  logging: true,
});

module.exports = {
  sequelize,
};
