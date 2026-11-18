const express = require('express');
const router = express.Router();

const db = require('../db');

/**
 * @swagger
 * tags:
 *   name: peliculas_obras
 *   description: Operaciones sobre películas y obras
 */


/**
 * @swagger
 * /api/peliculas_obras:
 *   get:
 *     summary: Obtener todas las películas y obras
 *     tags: [peliculas_obras]
 *     responses:
 *       200:
 *         description: Lista de películas y obras
 */
router.get('/', async (req, res) => {
    try {
        const resultado = await db.query('SELECT * FROM peliculas_obras');
        res.status(200).json(resultado.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar la base de datos' });
    }
});

/**
 * @swagger
 * /api/peliculas_obras/{id}:
 *   get:
 *     summary: Obtener una película u obra por ID
 *     tags: [peliculas_obras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Película u obra encontrada
 *       404:
 *         description: Película u obra no encontrada
 */
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const resultado = await db.query('SELECT * FROM peliculas_obras WHERE id_pelicula_obra = $1', [id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Película u obra no encontrada' });
        }
        res.status(200).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar la base de datos' });
    }
});

/**
 * @swagger
 * /api/peliculas_obras:
 *   post:
 *     summary: Agregar una película o obra
 *     tags: [peliculas_obras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [titulo, duracion_minutos, clasificacion]
 *             properties:
 *               titulo:
 *                 type: string
 *               duracion_minutos:
 *                 type: integer
 *               clasificacion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Película o obra agregada
 */
router.post('/', async (req, res) => {
    try {
        const {titulo, duracion_minutos, clasificacion} = req.body;
        const query = 'INSERT INTO peliculas_obras (titulo, duracion_minutos, clasificacion) VALUES ($1, $2, $3) RETURNING *';
        const resultado = await db.query(query, [titulo, duracion_minutos, clasificacion]);
        res.status(201).json({message: 'Película u obra agregada exitosamente', pelicula_obra: resultado.rows[0]});
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar la película o obra' });
    }
});

/**
 * @swagger
 * /api/peliculas_obras/{id}:
 *   put:
 *     summary: Actualizar una película o obra
 *     tags: [peliculas_obras]
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
 *               titulo:
 *                 type: string
 *               duracion_minutos:
 *                 type: integer
 *               clasificacion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Película o obra actualizada
 *       404:
 *         description: Película u obra no encontrada
 */
router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {titulo, duracion_minutos, clasificacion} = req.body;
        const query = 'UPDATE peliculas_obras SET titulo = $1, duracion_minutos = $2, clasificacion = $3 WHERE id_pelicula_obra = $4 RETURNING *';
        const resultado = await db.query(query, [titulo, duracion_minutos, clasificacion, id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Película u obra no encontrada' });
        }
        res.status(200).json({message: 'Película o obra actualizada exitosamente', pelicula_obra: resultado.rows[0]});
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la película o obra' });
    }
});

/**
 * @swagger
 * /api/peliculas_obras/{id}:
 *   delete:
 *     summary: Eliminar una película o obra
 *     tags: [peliculas_obras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Película o obra eliminada
 *       404:
 *         description: Película u obra no encontrada
 */
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const query = 'DELETE FROM peliculas_obras WHERE id_pelicula_obra = $1 RETURNING *';
        const resultado = await db.query(query, [id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Película u obra no encontrada' });
        }
        res.status(200).json({message: 'Película o obra eliminada exitosamente'});
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la película o obra' });
    }
});

module.exports = router;