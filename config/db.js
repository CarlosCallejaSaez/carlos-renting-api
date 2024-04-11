const mongoose = require('mongoose');

// URL de conexión a la base de datos
const dbUrl = 'mongodb+srv://mongodb:mongodb@rockthecode.vtwcyx2.mongodb.net/CARLOSRENTING?retryWrites=true&w=majority&appName=RockTheCode';

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
