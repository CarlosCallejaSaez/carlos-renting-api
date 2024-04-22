const SensorData = require('../models/SensorData');
const { calculateStatistics } = require('../utils/statistics');
const NodeCache = require('node-cache');

// Crear una nueva instancia de caché con un tiempo de vida de 10 segundos
const cache = new NodeCache({ stdTTL: 10 });

async function addData(req, res) {
  const newData = new SensorData(req.body);
  try {
    await newData.save();
    
    // Limpiar la caché después de agregar nuevos datos
    cache.flushAll();
    
    res.status(201).json({ message: 'Datos agregados al data lake' });
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar los datos en el data lake.' });
  }
}

async function getAllData(req, res) {
  try {
    // Intentar obtener datos de la caché
    const cachedData = cache.get('sensorData');

    if (cachedData) {
      // Si los datos están en la caché, enviarlos directamente
      res.json(cachedData);
    } else {
      // Si no están en la caché, obtenerlos de la base de datos
      const data = await SensorData.find();
      const values = data.map(entry => entry.value);
      const stats = calculateStatistics(values);
      
      // Guardar los datos en la caché
      cache.set('sensorData', { data, stats });

      res.json({ data, stats });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los datos del data lake.' });
  }
}

module.exports = { addData, getAllData };
