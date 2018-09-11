const Sequelize = require('sequelize')
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5433/pupper', {
    logging: false,
    operatorsAliases: false,
  }
)
module.exports = db

//5432 is default