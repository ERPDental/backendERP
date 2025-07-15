# 🚀 Node.js API para ERP Dental

Esta carpeta contiene una implementación completa de la API REST en Node.js/Express para el sistema ERP Dental.

## 🏗️ Tecnologías

- **Node.js + Express** - Framework web
- **TypeScript** - Tipado estático  
- **Sequelize** - ORM (configurado)
- **Joi** - Validación de datos
- **CORS + Helmet** - Seguridad
- **Fake Data** - Para testing sin BD

## 🚀 Instalación Rápida

```bash
# Desde la carpeta nodejs-api/
npm install
node server-simple.js
```

Servidor disponible en: http://localhost:3000

## 📊 Endpoints Implementados

### Dashboard
- `GET /api/dashboard` - Estadísticas del consultorio

### Pacientes  
- `GET /api/pacientes` - Obtener todos
- `GET /api/pacientes/total` - Total de pacientes
- `GET /api/pacientes/search?q=termino` - Buscar
- `POST /api/pacientes` - Crear paciente
- `PUT /api/pacientes/:id` - Actualizar
- `DELETE /api/pacientes/:id` - Eliminar

### Citas
- `GET /api/citas` - Obtener todas las citas
- `GET /api/citas/hoy` - Citas de hoy
- `POST /api/citas` - Crear cita
- `PATCH /api/citas/:id/confirmar` - Confirmar cita
- `PATCH /api/citas/:id/cancelar` - Cancelar cita

## 🧪 Testing con Postman

1. Importar: `ERP_Dental_Postman_Collection.json`
2. Configurar: `base_url = http://localhost:3000`
3. Probar endpoints

## 🏗️ Arquitectura

```
src/
├── config/          # Configuraciones
├── controllers/     # Controladores HTTP
├── services/        # Lógica de negocio
├── repositories/    # Acceso a datos
├── models/          # Interfaces TypeScript
└── routes/          # Rutas de API
```

## 📝 Notas

- Funciona con **datos fake** para testing inmediato
- Compatible con el backend Django existente
- Preparado para integración con PostgreSQL
- Incluye validaciones y manejo de errores completo

## 🔄 Integración

Esta API Node.js es complementaria al backend Django principal y puede:
- Ser usada como microservicio
- Integrarse con el frontend React
- Conectarse a la misma base de datos PostgreSQL
- Funcionar independientemente para testing
