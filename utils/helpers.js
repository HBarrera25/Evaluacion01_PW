
// Devuelve un booleano indicando si hay texto válido.
function esTextoValido(valor) {
  return typeof valor === 'string' && valor.trim().length > 0;
}

// Normaliza las prioridades usando if y else if.
function normalizarPrioridad(valor) {
  const prioridad = valor.trim().toLowerCase();

  if (prioridad === 'alta') {
    return 'Alta';
  } else if (prioridad === 'media') {
    return 'Media';
  } else if (prioridad === 'baja') {
    return 'Baja';
  }

  return null;
}

// Valida y normaliza el estado utilizando switch.
function normalizarEstado(valor) {
  if (!esTextoValido(valor)) {
    return null;
  }

  switch (valor.trim().toLowerCase()) {
    case 'pendiente':
      return 'Pendiente';

    case 'en proceso':
      return 'En Proceso';

    case 'resuelta':
      return 'Resuelta';

    case 'cancelada':
      return 'Cancelada';

    default:
      return null;
  }
}

// La clasificación se determina exclusivamente con switch.
function obtenerClasificacion(prioridad) {
  switch (prioridad) {
    case 'Alta':
      return 'Crítica';

    case 'Media':
      return 'Importante';

    case 'Baja':
      return 'Normal';

    default:
      return null;
  }
}

// Devuelve un mensaje de error o null si los datos son válidos.
function validarRegistro(datos) {
  if (
    !datos ||
    typeof datos !== 'object' ||
    Array.isArray(datos)
  ) {
    return 'Debe enviar un objeto JSON con los datos de la incidencia';
  }

  const campos = [
    'empleado',
    'area',
    'descripcion',
    'prioridad',
  ];

  const campoInvalido = campos.find(
    (campo) => !esTextoValido(datos[campo])
  );

  if (campoInvalido) {
    return `El campo ${campoInvalido} es obligatorio y debe ser un texto no vacío`;
  }

  if (!normalizarPrioridad(datos.prioridad)) {
    return 'La prioridad debe ser Alta, Media o Baja';
  }

  return null;
}

// Convierte el parámetro de la URL en un ID numérico válido.
function convertirId(valor) {
  const id = Number(valor);

  const esValido =
    /^\d+$/.test(valor) &&
    Number.isSafeInteger(id) &&
    id > 0;

  return esValido ? id : null;
}

module.exports = {
  esTextoValido,
  normalizarPrioridad,
  normalizarEstado,
  obtenerClasificacion,
  validarRegistro,
  convertirId,
};