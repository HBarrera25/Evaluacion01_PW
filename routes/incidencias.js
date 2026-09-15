
const controlador = require('../controllers/incidenciasController');

function registrarRutas(app) {
  app.post('/incidencias', controlador.registrar);

  app.get('/incidencias', controlador.listar);

  app.get('/incidencias/:id', controlador.buscarPorId);

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

module.exports = registrarRutas;