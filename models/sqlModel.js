// app.js
import mysql2 from 'mysql2';
import { config } from '../config/config.js';

async function createConnection(dbConfig) {
  const connection = await mysql2.createConnection(
    dbConfig
  ).promise();
  try {
    console.log('Connected to the database');
    return connection; // Retorna a conexão bem-sucedida
  } catch (err) {
    console.error(`Error connecting to database: ${err.message}`);
    throw new Error(`Error connecting to database: ${err.message}`);
  }
};

async function executeQuery(connection) {
  const [rows] = await connection.query(`select * from users`);
  return rows;
};

async function endConnection(connection) {
  try {
    connection.end()
    console.log(`Connection closed`)
  } catch (err) {
    throw new Error(`Error closing connection ${err.message}`)
  }
};

const connection = await createConnection(config)
let teste = await executeQuery(connection)
console.log(teste)
await endConnection(connection)

export {
  createConnection,
  endConnection
}
