const express = require('express');
const router = express.Router();

const db = require('../db');

/**
 * @swagger
 * tags:
 *   name: salas
 *   description: Operaciones sobre salas
 */
/**
 * @swagger
 * /api/salas:
 *   get:
 *     summary: Obtener todas las salas
 *     tags: [salas]
 *     responses:
 *       200:
 *         description: Lista de salas
 */
router.get('/', async (req, res) => {
    try {
        const resultado = await db.query('SELECT * FROM salas');
        res.status(200).json(resultado.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar la base de datos' });
    }
});

/**
 * @swagger
 * /api/salas:
 *   post:
 *     summary: Agregar una sala
 *     tags: [salas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre_numero, capacidad_total, tipo]
 *             properties:
 *               nombre_numero:
 *                 type: varchar
 *               capacidad_total:
 *                 type: integer
 *               tipo:
 *                 type: varchar
 *     responses:
 *       201:
 *         description: Sala agregada
 */
router.post('/', async (req, res) => {
    try {
        const {nombre_numero, capacidad_total, tipo} = req.body;
        const query = 'INSERT INTO salas (nombre_numero, capacidad_total, tipo) VALUES ($1, $2, $3) RETURNING *';
        const resultado = await db.query(query, [nombre_numero, capacidad_total, tipo]);
        res.status(201).json({message: 'Sala agregada exitosamente', sala: resultado.rows[0]});
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar la sala' });
    }
});

/**
 * @swagger
 * /api/salas/{id}:
 *   put:
 *     summary: Actualizar una sala
 *     tags: [salas]
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
 *               nombre_numero:
 *                 type: varchar
 *               capacidad_total:
 *                 type: integer
 *               tipo:
 *                 type: varchar
 *     responses:
 *       200:
 *         description: Sala actualizada
 */
router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {nombre_numero, capacidad_total, tipo} = req.body;
        const query = 'UPDATE salas SET nombre_numero = $1, capacidad_total = $2, tipo = $3 WHERE id_sala = $4 RETURNING *';
        const resultado = await db.query(query, [nombre_numero, capacidad_total, tipo, id]);
        res.status(200).json({message: 'Sala actualizada exitosamente', sala: resultado.rows[0]});
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la sala' });
    }
});

/**
 * @swagger
 * /api/salas/{id}:
 *   delete:
 *     summary: Eliminar una sala
 *     tags: [salas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sala eliminada
 */
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const query = 'DELETE FROM salas WHERE id_sala = $1 RETURNING *';
        await db.query(query, [id]);
        res.status(200).json({message: 'Sala eliminada exitosamente'});
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la sala' });
    }
});

module.exports = router;