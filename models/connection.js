// models/connection.js
const mysql = require('mysql2');
const {dbConfig} = require("../config/keys"); // Requiere tu archivo keys.js

// Crear una conexión con MySQL
const db = mysql.createConnection(dbConfig);

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos MySQL:', err);
    process.exit(1);
  } else {
    console.log('Conexión a la base de datos MySQL establecida.');
  }
});

module.exports = db;
