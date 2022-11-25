const { Sequelize } = require('sequelize');

// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize('back_test_database_data', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
exports.sequelize = sequelize;