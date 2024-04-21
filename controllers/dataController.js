const SensorData = require('../models/SensorData');
const { calculateStatistics } = require('../utils/statistics');

async function addData(req, res) {
  const newData = new SensorData(req.body);
  try {
    await newData.save();
    res.status(201).json({ message: 'Datos agregados al data lake' });
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar los datos en el data lake.' });
  }
}

async function getAllData(req, res) {
    try {
      const data = await SensorData.find();
      const values = data.map(entry => entry.value);
      const stats = calculateStatistics(values);
      res.json({ data, stats });
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener los datos del data lake.' });
    }
  }
  

module.exports = { addData, getAllData };
