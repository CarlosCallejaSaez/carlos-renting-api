const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Obtiene todos los coches
 *     description: Retorna una lista de todos los coches, opcionalmente filtrados por marca y/o año.
 *     parameters:
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Marca del coche a filtrar
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Año del coche a filtrar
 *     responses:
 *       '200':
 *         description: Éxito, lista de coches obtenida
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID del coche
 *                   brand:
 *                     type: string
 *                     description: Marca del coche
 *                   model:
 *                     type: string
 *                     description: Modelo del coche
 *                   year:
 *                     type: integer
 *                     description: Año del coche
 *                   color:
 *                     type: string
 *                     description: Color del coche
 *                   available:
 *                     type: boolean
 *                     description: Disponibilidad del coche
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */


// Ruta para obtener todos los coches
router.get('/', carController.getAllCars);
/**
 * @swagger
 * /cars/{id}:
 *   get:
 *     summary: Obtiene un coche por su ID
 *     description: Retorna un coche basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del coche a buscar
 *     responses:
 *       200:
 *         description: Éxito, coche encontrado
 *       404:
 *         description: Coche no encontrado
 *       500:
 *         description: Error interno del servidor
 */

// Ruta para obtener un coche por su ID
router.get('/:id', carController.getCarById);

/**
 * @swagger
 * /cars:
 *   post:
 *     summary: Crea un nuevo coche
 *     description: Crea un nuevo coche con los datos proporcionados en el cuerpo de la solicitud.
 *     parameters:
 *       - in: body
 *         name: car
 *         description: Datos del coche a crear
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             brand:
 *               type: string
 *               description: Marca del coche
 *             model:
 *               type: string
 *               description: Modelo del coche
 *             year:
 *               type: integer
 *               description: Año del coche
 *             color:
 *               type: string
 *               description: Color del coche
 *             available:
 *               type: boolean
 *               description: Disponibilidad del coche (opcional, por defecto es true)
 *     responses:
 *       '201':
 *         description: Coche creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID del coche creado
 *                 brand:
 *                   type: string
 *                   description: Marca del coche
 *                 model:
 *                   type: string
 *                   description: Modelo del coche
 *                 year:
 *                   type: integer
 *                   description: Año del coche
 *                 color:
 *                   type: string
 *                   description: Color del coche
 *                 available:
 *                   type: boolean
 *                   description: Disponibilidad del coche
 *       '400':
 *         description: Error en la solicitud, los datos proporcionados son incorrectos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */

// Ruta para crear un nuevo coche
router.post('/', carController.createCar);

/**
 * @swagger
 * /cars/{id}:
 *   put:
 *     summary: Actualiza un coche existente
 *     description: Actualiza un coche existente con los datos proporcionados en el cuerpo de la solicitud.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del coche a actualizar
 *       - in: body
 *         name: car
 *         description: Datos del coche a actualizar
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             brand:
 *               type: string
 *               description: Nueva marca del coche
 *             model:
 *               type: string
 *               description: Nuevo modelo del coche
 *             year:
 *               type: integer
 *               description: Nuevo año del coche
 *             color:
 *               type: string
 *               description: Nuevo color del coche
 *             available:
 *               type: boolean
 *               description: Nueva disponibilidad del coche
 *     responses:
 *       '200':
 *         description: Coche actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID del coche actualizado
 *                 brand:
 *                   type: string
 *                   description: Marca del coche actualizado
 *                 model:
 *                   type: string
 *                   description: Modelo del coche actualizado
 *                 year:
 *                   type: integer
 *                   description: Año del coche actualizado
 *                 color:
 *                   type: string
 *                   description: Color del coche actualizado
 *                 available:
 *                   type: boolean
 *                   description: Disponibilidad del coche actualizado
 *       '400':
 *         description: Error en la solicitud, los datos proporcionados son incorrectos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */

// Ruta para actualizar un coche existente
router.put('/:id', carController.updateCar);
/**
 * @swagger
 * /cars/{id}:
 *   delete:
 *     summary: Elimina un coche existente
 *     description: Elimina un coche existente basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del coche a eliminar
 *     responses:
 *       '200':
 *         description: Coche eliminado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación de eliminación
 *       '404':
 *         description: Coche no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */


// Ruta para eliminar un coche
router.delete('/:id', carController.deleteCar);

module.exports = router;

/**
 * @swagger
 * /cars/available:
 *   get:
 *     summary: Obtiene solo los coches disponibles
 *     description: Retorna una lista de todos los coches disponibles.
 *     responses:
 *       200:
 *         description: Éxito, lista de coches disponibles obtenida
 *       500:
 *         description: Error interno del servidor
 */

// Ruta para obtener solo los coches disponibles
router.get('/available', carController.getAvailableCars);