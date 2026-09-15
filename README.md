# 🛠️ Sistema de Gestión de Incidencias TechSupport S.A.

**Evaluación 01 · Programación Web · UCA**

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

API desarrollada con **Node.js y Express** para registrar y administrar incidencias reportadas por empleados de distintas áreas. Cada reporte contiene el nombre del empleado, el área, una descripción del problema, su prioridad y su estado de atención.

El programa permite consultar incidencias, actualizar su estado, eliminarlas y obtener estadísticas generales para conocer el avance de su atención. También clasifica los reportes según su prioridad y valida los datos recibidos. Las respuestas se entregan en formato **JSON** y pueden consultarse desde el navegador o mediante solicitudes HTTP.

## ✨ Funcionalidades

- Registrar incidencias con prioridad **Alta, Media o Baja**.
- Consultar todos los reportes o buscar uno por su ID.
- Cambiar el estado a **Pendiente, En Proceso, Resuelta o Cancelada**.
- Clasificar las incidencias como **Crítica, Importante o Normal**.
- Consultar estadísticas por estado y eliminar reportes.


## 📁 Estructura del proyecto

```text
Evaluacion01_PW/
├── app.js                          # Configuración e inicio del servidor
├── controllers/
│   └── incidenciasController.js     # Operaciones y estadísticas de incidencias
├── routes/
│   └── incidencias.js               # Definición de las rutas de la API
├── utils/
│   └── helpers.js                   # Validaciones, normalización y clasificación
├── docs/
│   └── pruebas-incidencias.txt      # Guía de pruebas básicas
├── .gitignore                      # Archivos excluidos de Git
├── package.json                    # Dependencias y comandos del proyecto
├── package-lock.json               # Versiones exactas de las dependencias
└── README.md                       # Presentación y guía del proyecto
```


## 🚀 Cómo ejecutar

Con **Node.js y npm** instalados, abre una terminal en la carpeta del proyecto y ejecuta:

```powershell
npm install
npm start
```

Cuando aparezca el mensaje de inicio, abre [http://localhost:3000/incidencias](http://localhost:3000/incidencias). Si aún no has registrado incidencias, verás `[]`.

## 🧪 Pruebas básicas

**[Abrir la guía de pruebas básicas](docs/pruebas-incidencias.txt)**

La guía incluye comandos de PowerShell y resultados esperados para comprobar el registro, las consultas, los cambios de estado, las estadísticas, las validaciones y la eliminación de incidencias.

Mantén el servidor funcionando y usa **otra terminal** para las pruebas. En cada terminal nueva, define primero:

```powershell
$base = "http://localhost:3000"
```

## 👥 Integrantes

| Nombre | Carnet |
| :--- | :---: |
| Barrera Gómez, Heraldo Riquelmy | 00226325 |
| Escobar Menjivar, Jorge Alberto | 00072325 |
| Claros Lopez, Erick Jose | 00071125 |
