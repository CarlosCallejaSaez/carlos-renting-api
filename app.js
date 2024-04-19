require("dotenv").config();
const http = require('http');
const { configureSocket } = require('./config/socketConfig'); 
const express = require("express");
const rateLimit = require('express-rate-limit');
var cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const specs = require("./config/swaggerConfig");
const app = express();
const connectDB = require("./config/db");
const readline = require('readline');






const server = http.createServer(app);
const io = configureSocket(server); 
app.use(cors());




app.use(
  helmet.contentSecurityPolicy({
    directives: {
      
    

      "script-src-attr": ["'unsafe-inline'"],
    },
  })
);

// Límite de tasa ( 100 peticiones por hora)
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora en milisegundos
  max: 100, // límite de 100 peticiones por hora
  message: 'Has excedido el límite de peticiones. Por favor, inténtalo de nuevo más tarde.'
});

// Aplica el middleware de límite de tasa a todas las rutas
app.use(limiter);



// Define la ruta del archivo de log
const logFilePath = path.join(__dirname, "logs", "access.log");

// Crea un stream de escritura de archivos para los logs
const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

// Configura Morgan para que registre logs en el stream de escritura de archivos
app.use(morgan("combined", { stream: logStream }));

// Conexión a la base de datos
connectDB();

app.use(express.json());

// Métricas
app.get('/metrics', async (req, res) => {
  try {
      const metrics = await processLogFile();
      res.json(metrics);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al procesar las métricas' });
  }
});

async function processLogFile() {
  const fileStream = fs.createReadStream(logFilePath);
  const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
  });

  let metrics = {
      totalRequests: 0,
      statusCodes: {}
  };

  for await (const line of rl) {
      const [_, __, ___, ____, _____, statusCode] = line.split(' ');

      metrics.totalRequests++;
      
      metrics.statusCodes[statusCode] = (metrics.statusCodes[statusCode] || 0) + 1;
  }

 
  return metrics;
}

// Rutas
const carRoutes = require("./routes/carRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
const staffRoutes = require("./routes/staffRoutes");
const chatRouter = require('./routes/chatRouter');
const newsRouter = require('./routes/newsRouter');

app.use("/cars", carRoutes);
app.use("/reservations", reservationRoutes);
app.use("/users", userRoutes);
app.use("/comments", commentRoutes);
app.use("/staff", staffRoutes);
app.use('/news', newsRouter);
app.use('/chat', chatRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

//  Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));




// Ruta para el manejo de errores 404
app.get("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "index.html"));
});


// Error handler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);



// Puerto de escucha
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Servidor en ejecución en el puerto ${PORT}`)
);

module.exports = app;
