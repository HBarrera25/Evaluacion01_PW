const controlador = require('../controllers/incidenciasController');

// Conecta cada método HTTP y ruta con su función del controlador.
function registrarRutas(app) {
  app.post('/incidencias', controlador.registrar);

  app.get('/incidencias', controlador.listar);

// Conecta cada método HTTP y ruta con su función del controlador.
  app.get('/incidencias/:id', controlador.buscarPorId);

// Actualiza únicamente el estado de la incidencia.
  app.put(
    '/incidencias/:id/estado',
    controlador.cambiarEstado
  );

  app.delete('/incidencias/:id', controlador.eliminar);

  app.get('/estadisticas', controlador.estadisticas);

  app.get(
    '/incidencias/:id/clasificacion',
    controlador.clasificar
  );
}

// Permite registrar las rutas desde app.js.
module.exports = registrarRutas;