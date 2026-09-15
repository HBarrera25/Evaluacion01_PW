const {
    normalizarPrioridad,
    normalizarEstado,
    obtenerClasificacion,
    validarRegistro,
    convertirId,
} = require('../utils/helpers');

// Almacenamiento en memoria.
const incidencias = [];

// Aumenta al registrar; no se reutilizan IDs eliminados.
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

    const incidencia = {
        id: siguienteId++,
        empleado: empleado.trim(),
        area: area.trim(),
        descripcion: descripcion.trim(),
        prioridad: normalizarPrioridad(prioridad),
        estado: 'Pendiente',
    };

    incidencias.push(incidencia);

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

// PUT /incidencias/:id/estado
function cambiarEstado(req, res) {
    const incidencia = buscarIncidencia(req, res);

    if (!incidencia) {
        return;
    }

    // Esta función utiliza switch para validar el estado.
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
            enProceso: 0,
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
    cambiarEstado,
    eliminar,
    estadisticas,
    clasificar,
};