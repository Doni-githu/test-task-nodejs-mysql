const { Sequelize } = require('sequelize')

// Конфигурация базы данных
const sequelize = new Sequelize('sql12675714', 'sql12675714', 'NzKKpqPljp', {
    host: 'sql12.freesqldatabase.com',
    dialect: 'mysql',
});

module.exports = sequelize