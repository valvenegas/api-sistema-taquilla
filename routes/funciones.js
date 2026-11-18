const express = require('express');
const router = express.Router();

const db = require('../db');

/**
 * @swagger
 * tags:
 *   name: Funciones
 *   description: Operaciones sobre funciones
 */
/**
 * @swagger
 * /api/funciones:
 *   get:
 *     summary: Obtener todas las funciones
 *     tags: [Funciones]
 *     responses:
 *       200:
 *         description: Lista de funciones
 */
router.get('/', async (req, res) => {
    try {
        const resultado = await db.query('SELECT * FROM funciones');
        res.status(200).json(resultado.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar la base de datos' });
    }
});

/**
 * @swagger
 * /api/funciones/{id}:
 *   get:
 *     summary: Obtener una función por ID
 *     tags: [Funciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Función encontrada
 *       404:
 *         description: Función no encontrada
 */
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const resultado = await db.query('SELECT * FROM funciones WHERE id_funcion = $1', [id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Función no encontrada' });
        }
        res.status(200).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar la base de datos' });
    }
});

/**
 * @swagger
 * /api/funciones:
 *   post:
 *     summary: Agregar una función
 *     tags: [Funciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fecha_hora_proyeccion, id_pelicula_obra, id_sala]
 *             properties:
 *               fecha_hora_proyeccion:
 *                 type: string
 *                 format: date-time
 *               id_pelicula_obra:
 *                 type: integer
 *               id_sala:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Función agregada
 */
router.post('/', async (req, res) => {
    try {
        const {fecha_hora_proyeccion, id_pelicula_obra, id_sala} = req.body;
        const query = 'INSERT INTO funciones (fecha_hora_proyeccion, id_pelicula_obra, id_sala) VALUES ($1, $2, $3) RETURNING *';
        const resultado = await db.query(query, [fecha_hora_proyeccion, id_pelicula_obra, id_sala]);
        res.status(201).json({message: 'Función agregada exitosamente', funcion: resultado.rows[0]});
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar la función' });
    }
});

/**
 * @swagger
 * /api/funciones/{id}:
 *   put:
 *     summary: Actualizar una función
 *     tags: [Funciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha_hora_proyeccion:
 *                 type: string
 *                 format: date-time
 *               id_pelicula_obra:
 *                 type: integer
 *               id_sala:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Función actualizada
 *       404:
 *         description: Función no encontrada
 */
router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {fecha_hora_proyeccion, id_pelicula_obra, id_sala} = req.body;
        const query = 'UPDATE funciones SET fecha_hora_proyeccion = $1, id_pelicula_obra = $2, id_sala = $3 WHERE id_funcion = $4 RETURNING *';
        const resultado = await db.query(query, [fecha_hora_proyeccion, id_pelicula_obra, id_sala, id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Función no encontrada' });
        }
        res.status(200).json({message: 'Función actualizada exitosamente', funcion: resultado.rows[0]});
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la función' });
    }
});

/**
 * @swagger
 * /api/funciones/{id}:
 *   delete:
 *     summary: Eliminar una función
 *     tags: [Funciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Función eliminada
 *       404:
 *         description: Función no encontrada
 */
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const query = 'DELETE FROM funciones WHERE id_funcion = $1 RETURNING *';
        const resultado = await db.query(query, [id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Función no encontrada' });
        }
        res.status(200).json({message: 'Función eliminada exitosamente'});
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la función' });
    }
});

module.exports = router;