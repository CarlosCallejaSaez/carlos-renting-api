require('dotenv').config()
const express = require('express');
var cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const specs = require('./config/swaggerConfig');
const app = express();
const connectDB = require('./config/db');

app.use(cors())

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        fontSrc: ["'self'"],
        imgSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);

// Define la ruta del archivo de log
const logFilePath = path.join(__dirname, 'logs', 'access.log');

// Crea un stream de escritura de archivos para los logs
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

// Configura Morgan para que registre logs en el stream de escritura de archivos
app.use(morgan('combined', { stream: logStream }));


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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configurar la ruta para el manejo de errores 404
app.get("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Puerto de escucha
const PORT =  process.env.PORT ;
app.listen(PORT, () => console.log(`Servidor en ejecución en el puerto ${PORT}`));

module.exports = app;
