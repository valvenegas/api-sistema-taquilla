
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
app.use(cors());
app.use(express.json());

const swaggerOptions = {
    definition:{
        openapi: "3.0.0",
        info: {
            title: "API de gestion de boletos de cine y teatro",
            version: "1.0.0",
            description: "Documentacion tecnica estructurada en modulos, gestionando multiples tablas"
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor local de desarrollo"
            }
        ]
    },
    apis: ["./routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const rutaesBoletos = require('./routes/boletos');
const rutaesFunciones = require('./routes/funciones');
const rutaesSalas = require('./routes/salas');
const rutaesPeliculas_obras = require('./routes/peliculas_obras');

app.use('/api/boletos', rutaesBoletos);
app.use('/api/funciones', rutaesFunciones);
app.use('/api/salas', rutaesSalas);
app.use('/api/peliculas_obras', rutaesPeliculas_obras);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo exitosamente en el puerto http://localhost:${PORT}`);
    console. log(`Documentacion interactiva lista en http://localhost:${PORT}/api-docs`);
});

