const express = require('express');
const registrarRutas = require('./routes/incidencias');

const app = express();

// Permite recibir cuerpos de solicitudes en formato JSON.
app.use(express.json());

// Registra todos los endpoints.
registrarRutas(app);

// Responde cuando la ruta solicitada no existe.
app.use((req, res) => {
    res.status(404).json({
        mensaje: 'Ruta no encontrada',
    });
});

// Maneja errores.
app.use((error, req, res, next) => {
    if (error.type === 'entity.parse.failed') {
        return res.status(400).json({
            mensaje: 'El cuerpo debe ser JSON válido',
        });
    }

    if (error.type === 'entity.too.large') {
        return res.status(413).json({
            mensaje: 'El cuerpo de la solicitud es demasiado grande',
        });
    }

    console.error(error);

    res.status(500).json({
        mensaje: 'Error interno del servidor',
    });
});

// Inicia el servidor cuando ejecutamos node app.js.
if (require.main === module) {
    const puerto = process.env.PORT || 3000;

    app.listen(puerto, () => {
        console.log(`Servidor escuchando en http://localhost:${puerto}.`);
    });
}

module.exports = app;