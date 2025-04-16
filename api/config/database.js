const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

// Check if DATABASE_URL exists (Heroku provides this)
if (process.env.DATABASE_URL) {
  // Use the DATABASE_URL from Heroku
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // This is needed for Heroku PostgreSQL
      }
    },
    logging: false
  });
} else {
  // Use local database settings
  sequelize = new Sequelize(
    process.env.POSTGRES_DB || 'airbnb_clone', 
    process.env.POSTGRES_USER || 'postgres',
    process.env.POSTGRES_PASSWORD || 'postgres',
    {
      host: process.env.POSTGRES_HOST || 'localhost',
      dialect: 'postgres',
      logging: console.log, // Set to false to disable SQL query logging
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );
}

module.exports = sequelize;