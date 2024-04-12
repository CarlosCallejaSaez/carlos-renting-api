require('dotenv').config()
const express = require('express');
const app = express();
const connectDB = require('./config/db');

;

// Conexión a la base de datos
connectDB();


app.use(express.json());

// Rutas
const carRoutes = require('./routes/carRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');

app.use('/cars', carRoutes);
app.use('/reservations', reservationRoutes);
app.use('/users', userRoutes);
app.use('/comments', commentRoutes);

app.get("*", (req, res) => {
    res.status(404).send("<h1>Page not found on the server -Carlos Calleja Sáez-</h1>");
  });
  

// Puerto de escucha
const PORT =  process.env.PORT ;
app.listen(PORT, () => console.log(`Servidor en ejecución en el puerto ${PORT}`));

module.exports = app;
