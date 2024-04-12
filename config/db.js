const mongoose = require('mongoose');

// URL de conexión a la base de datos
const dbUrl = process.env.MONGODB;

// Configuración de la conexión a la base de datos
const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log('Conexión a la base de datos establecida');
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
