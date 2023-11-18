// app.js
import mysql2 from 'mysql2';
import {config} from '../config/config.js';

// Create a connection to the database
const connection = mysql2.createConnection({
    ...config,
    authSwitchHandler: function ({ pluginName, data }, cb) {
      if (pluginName === 'caching_sha2_password') {
        // Use mysql_native_password as the authentication method
        cb(null, Buffer.from('\0mysql_native_password'));
      }
    },
  });
  
  // Connect to the database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database: ', err);
      return;
    }
    console.log('Connected to the database');
    // Perform your database operations here
  });

// Close the connection when done
connection.end();
