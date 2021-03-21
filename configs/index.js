require('dotenv').config();

const {
  PORT, NODE_ENV, DB_URL,
} = process.env;
const isProd = NODE_ENV === 'production';
const port = (isProd && PORT) ? PORT : '3001';
const dbUrl = (isProd && DB_URL) ? DB_URL : 'mongodb://localhost:27017/networkdb';

module.exports = {
  PORT: port,
  DB_URL: dbUrl,
};
