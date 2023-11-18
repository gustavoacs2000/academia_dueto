import dotenv from 'dotenv';

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    authMethod: process.env.DB_AUTH_METHOD || 'default', // Set a default value if not provided
  };
export {
    config
}