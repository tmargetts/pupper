const Sequelize = require('sequelize')
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://paovlcovfnsiyj:9d9ba23183e6dd220270dac177d97ceadaa05b9b9909d8896a7ab5597976b8b9@ec2-23-23-216-40.compute-1.amazonaws.com:5432/db9u0do3rd5k4d', {
    logging: false,
    operatorsAliases: false,
  }
)
module.exports = db

//5432 is default