const SensorData = require('../models/SensorData');
const { calculateStatistics } = require('../utils/statistics');
const NodeCache = require('node-cache');
const Chart = require('chart.js/auto')

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
      
      // Agrupar los datos por tipo de sensor
      const groupedData = {};
      data.forEach(entry => {
        if (!groupedData[entry.sensor]) {
          groupedData[entry.sensor] = [];
        }
        groupedData[entry.sensor].push(entry.value);
      });

      // Calcular estadísticas para cada tipo de sensor
      const statsBySensor = {};
      for (const sensor in groupedData) {
        const values = groupedData[sensor];
        const stats = calculateStatistics(values);
        statsBySensor[sensor] = stats;
      }
      
      // Guardar los datos en la caché
      cache.set('sensorData', { data: groupedData, stats: statsBySensor });

        // Crear gráficos de barras para las estadísticas de cada sensor
        const charts = {};
        for (const sensor in statsBySensor) {
          const canvas = `<canvas id="${sensor}-chart" width="400" height="200"></canvas>`;
          const chartData = {
            labels: Object.keys(statsBySensor[sensor]),
            datasets: [{
              label: 'Estadísticas',
              data: Object.values(statsBySensor[sensor]),
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          };
          charts[sensor] = { canvas, data: chartData };
        }
      res.json({ data: groupedData, stats: statsBySensor, charts });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los datos del data lake.' });
  }
}

module.exports = { addData, getAllData };
