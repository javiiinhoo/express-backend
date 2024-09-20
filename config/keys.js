// keys.js
const { log } = require("console");
const path = require("path");
const db = require("../models/connection");


// Cargar las variables de entorno en desarrollo
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config(); // Cargar variables de entorno desde un archivo .env en local
}

// Validar que las variables necesarias estén presentes
const requiredEnvVars = [
  "DB_HOST",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "PORT",
];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Falta la variable de entorno: ${varName}`);
  }
});


module.exports = {
  // Configuración de la base de datos MySQL
  dbConfig: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  // Puerto del servidor
  port: process.env.PORT || 3000,
};
 