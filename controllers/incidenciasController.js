const {
    normalizarPrioridad,
    normalizarEstado,
    obtenerClasificacion,
    validarRegistro,
    convertirId,
} = require('../utils/helpers');

// Los registros se almacenan en memoria y se pierden al reiniciar el servidor.
const incidencias = [];

// Genera IDs consecutivos sin reutilizar los de incidencias eliminadas.
let siguienteId = 1;

// Función compartida para buscar y manejar errores.
function buscarIncidencia(req, res) {
    const id = convertirId(req.params.id);

    if (id === null) {
        res.status(400).json({
            mensaje: 'El ID debe ser un entero positivo válido',
        });

        return null;
    }

    const incidencia = incidencias.find(
        (item) => item.id === id
    );

    if (!incidencia) {
        res.status(404).json({
            mensaje: 'Incidencia no encontrada',
        });

        return null;
    }

    return incidencia;
}

// POST /incidencias
function registrar(req, res) {
    const error = validarRegistro(req.body);

    if (error) {
        return res.status(400).json({
            mensaje: error,
        });
    }

    const {
        empleado,
        area,
        descripcion,
        prioridad,
    } = req.body;

// El servidor asigna el ID y el estado inicial.
    const incidencia = {
        id: siguienteId++,
        empleado: empleado.trim(),
        area: area.trim(),
        descripcion: descripcion.trim(),
        prioridad: normalizarPrioridad(prioridad),
        estado: 'Pendiente',
    };

    incidencias.push(incidencia);

// Location indica la dirección del recurso creado.
    res
        .location(`/incidencias/${incidencia.id}`)
        .status(201)
        .json({
            mensaje: 'Incidencia registrada correctamente',
        });
}

// GET /incidencias
function listar(req, res) {
    res.json(incidencias);
}

// GET /incidencias/:id
function buscarPorId(req, res) {
    const incidencia = buscarIncidencia(req, res);

    if (!incidencia) {
        return;
    }

    res.json(incidencia);
}

// GET /incidencias/nombre/:nombre
function buscarPorNombre(req, res) {
    const nombre = req.params.nombre.trim().toLowerCase();

    if (!nombre) {
        return res.status(400).json({
            mensaje: 'Debe proporcionar un nombre',
        });
    }

    const resultados = incidencias.filter(
        (incidencia) =>
            incidencia.empleado.toLowerCase() === nombre
    );

    if (resultados.length === 0) {
        return res.status(404).json({
            mensaje: 'No se encontraron incidencias para ese empleado',
        });
    }

    res.json(resultados);
}

// GET /incidencias/estado/:estado
function buscarPorEstado(req, res) {
    const estado = normalizarEstado(req.params.estado);

    if (!estado) {
        return res.status(400).json({
            mensaje: 'El estado debe ser Pendiente, En Proceso, Resuelta o Cancelada',
        });
    }

    const resultados = incidencias.filter(
        (incidencia) => incidencia.estado === estado
    );

    res.json(resultados);
}

// GET /incidencias/prioridad/:prioridad
function buscarPorPrioridad(req, res) {
    const prioridad = normalizarPrioridad(req.params.prioridad);

    if (!prioridad) {
        return res.status(400).json({
            mensaje: 'La prioridad debe ser Alta, Media o Baja',
        });
    }

    const resultados = incidencias.filter(
        (incidencia) => incidencia.prioridad === prioridad
    );

    res.json(resultados);
}

// PUT /incidencias/:id/estado
function cambiarEstado(req, res) {
    const incidencia = buscarIncidencia(req, res);

    if (!incidencia) {
        return;
    }

    // Esta función valida el estado.
    const estado = normalizarEstado(req.body?.estado);

    if (!estado) {
        return res.status(400).json({
            mensaje:
                'El estado debe ser Pendiente, En Proceso, Resuelta o Cancelada',
        });
    }

    incidencia.estado = estado;

    res.json({
        mensaje: 'Estado actualizado correctamente',
    });
}

// DELETE /incidencias/:id
function eliminar(req, res) {
    const id = convertirId(req.params.id);

    if (id === null) {
        return res.status(400).json({
            mensaje: 'El ID debe ser un entero positivo válido',
        });
    }

    const indice = incidencias.findIndex(
        (incidencia) => incidencia.id === id
    );

    if (indice === -1) {
        return res.status(404).json({
            mensaje: 'Incidencia no encontrada',
        });
    }

    incidencias.splice(indice, 1);

    res.json({
        mensaje: 'Incidencia eliminada correctamente',
    });
}

// GET /estadisticas
function estadisticas(req, res) {
    const claves = {
        Pendiente: 'pendientes',
        'En Proceso': 'enProceso',
        Resuelta: 'resueltas',
        Cancelada: 'canceladas',
    };

    // Calcula los conteos con un método de arreglos.
    // No utiliza variables contadoras independientes.
    const resultado = incidencias.reduce(
        (acumulado, incidencia) => {
            acumulado[claves[incidencia.estado]] += 1;

            return acumulado;
        },
        {
            totalIncidencias: incidencias.length,
            pendientes: 0,
            enproceso: 0,
            resueltas: 0,
            canceladas: 0,
        }
    );

    res.json(resultado);
}

// GET /incidencias/:id/clasificacion
function clasificar(req, res) {
    const incidencia = buscarIncidencia(req, res);

    if (!incidencia) {
        return;
    }

    res.json({
        id: incidencia.id,
        clasificacion: obtenerClasificacion(
            incidencia.prioridad
        ),
    });
}

module.exports = {
    registrar,
    listar,
    buscarPorId,
    buscarPorNombre,
    buscarPorEstado,
    buscarPorPrioridad,
    cambiarEstado,
    eliminar,
    estadisticas,
    clasificar,
};
