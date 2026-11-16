const express = require('express');
const router = express.Router();

const db = require('../db');

/**
 * @swagger
 * tags:
 *   name: Boletos
 *   description: Operaciones sobre boletos
 */

/**
 * @swagger
 * /api/boletos:
 *   get:
 *     summary: Obtener todos los boletos
 *     tags: [Boletos]
 *     responses:
 *       200:
 *         description: Lista de boletos
 */
router.get('/', async (req, res) => {
    try {
        const resultado = await db.query('SELECT * FROM boletos');
        res.status(200).json(resultado.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar la base de datos' });
    }
});

/**
 * @swagger
 * /api/boletos:
 *   post:
 *     summary: Agregar un boleto
 *     tags: [Boletos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [numero_asiento, precio_pagado, id_funcion]
 *             properties:
 *               numero_asiento:
 *                 type: varchar
 *               precio_pagado:
 *                 type: numeric
 *               id_funcion:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Boleto agregado
 */
router.post('/', async (req, res) => {
    try {
        const {numero_asiento, precio_pagado, id_funcion} = req.body;
        const query = 'INSERT INTO boletos (numero_asiento, precio_pagado, id_funcion) VALUES ($1, $2, $3) RETURNING *';
        const resultado = await db.query(query, [numero_asiento, precio_pagado, id_funcion]);
        res.status(201).json({message: 'Boleto agregado exitosamente', boleto: resultado.rows[0]});
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el boleto' });
    }
});

/**
 * @swagger
 * /api/boletos/{id}:
 *   put:
 *     summary: Actualizar un boleto
 *     tags: [Boletos]
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
 *               numero_asiento:
 *                 type: integer
 *               precio_pagado:
 *                 type: numeric
 *               id_funcion:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Boleto actualizado
 */
router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {numero_asiento, precio_pagado, id_funcion} = req.body;
        const query = 'UPDATE boletos SET numero_asiento = $1, precio_pagado = $2, id_funcion = $3 WHERE id_boleto = $4 RETURNING *';
        const resultado = await db.query(query, [numero_asiento, precio_pagado, id_funcion, id]);
        res.status(200).json({message: 'Boleto actualizado exitosamente', boleto: resultado.rows[0]});
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el boleto' });
    }
});

/**
 * @swagger
 * /api/boletos/{id}:
 *   delete:
 *     summary: Eliminar un boleto
 *     tags: [Boletos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Boleto eliminado
 */
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const query = 'DELETE FROM boletos WHERE id_boleto = $1 RETURNING *';
        await db.query(query, [id]);
        res.status(200).json({message: 'Boleto eliminado exitosamente'});
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el boleto' });
    }
});

module.exports = router;