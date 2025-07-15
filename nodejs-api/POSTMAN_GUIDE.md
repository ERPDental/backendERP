# 🧪 GUÍA COMPLETA DE PRUEBAS CON POSTMAN
## ERP Backend Dental

### 🚀 PASO 1: INICIAR EL SERVIDOR
```bash
# En tu terminal, ejecuta uno de estos comandos:
node server-simple.js
# O alternativamente:
npm run dev:simple
# O con TypeScript:
npm run dev
```

El servidor debe mostrar:
```
🚀 Servidor corriendo en http://localhost:3000
📊 Dashboard: http://localhost:3000/api/dashboard
👥 Pacientes: http://localhost:3000/api/pacientes
📅 Citas: http://localhost:3000/api/citas
❤️  Health Check: http://localhost:3000/api/health-check
```

---

## 📋 COLECCIÓN DE POSTMAN - ENDPOINTS DISPONIBLES

### 1️⃣ **HEALTH CHECK**
```
GET http://localhost:3000/health
```
**Respuesta esperada:**
```json
{
  "status": "OK",
  "message": "Servidor funcionando correctamente",
  "timestamp": "2025-07-14T..."
}
```

### 2️⃣ **PÁGINA PRINCIPAL**
```
GET http://localhost:3000/
```
**Respuesta esperada:**
```json
{
  "message": "ERP Backend Dental - API funcionando",
  "mode": "fake-data",
  "timestamp": "2025-07-14T...",
  "endpoints": {
    "dashboard": "/api/dashboard",
    "pacientes": "/api/pacientes",
    "citas": "/api/citas",
    "health": "/api/health-check"
  }
}
```

---

## 📊 **DASHBOARD ENDPOINTS**

### 3️⃣ **Estadísticas del Dashboard**
```
GET http://localhost:3000/api/dashboard
```
**Respuesta esperada:**
```json
{
  "success": true,
  "data": {
    "total_pacientes": 15,
    "citas_hoy": 2,
    "ingresos_mes": 45000,
    "pacientes_nuevos_mes": 8,
    "citas_pendientes": 12,
    "inventario_bajo": 3
  }
}
```

---

## 👥 **PACIENTES ENDPOINTS**

### 4️⃣ **Obtener todos los pacientes**
```
GET http://localhost:3000/api/pacientes
```

### 5️⃣ **Obtener total de pacientes**
```
GET http://localhost:3000/api/pacientes/total
```

### 6️⃣ **Buscar pacientes**
```
GET http://localhost:3000/api/pacientes/search?q=juan
```

### 7️⃣ **Obtener paciente por ID**
```
GET http://localhost:3000/api/pacientes/1
```

### 8️⃣ **Crear nuevo paciente**
```
POST http://localhost:3000/api/pacientes
Content-Type: application/json

{
  "nombre": "Ana García",
  "telefono": "555-0123",
  "email": "ana.garcia@email.com",
  "fecha_nacimiento": "1985-03-15",
  "direccion": "Av. Principal 123",
  "genero": "Femenino",
  "estado_civil": "Soltero",
  "ocupacion": "Ingeniera",
  "contacto_emergencia_nombre": "Luis García",
  "contacto_emergencia_telefono": "555-0124",
  "alergias": "Ninguna",
  "medicamentos_actuales": "Ninguno",
  "historial_medico": "Sin antecedentes relevantes"
}
```

### 9️⃣ **Actualizar paciente**
```
PUT http://localhost:3000/api/pacientes/1
Content-Type: application/json

{
  "telefono": "555-9999",
  "email": "nuevo.email@test.com"
}
```

### 🔟 **Eliminar paciente**
```
DELETE http://localhost:3000/api/pacientes/1
```

---

## 📅 **CITAS ENDPOINTS**

### 9️⃣ **Obtener todas las citas**
```
GET http://localhost:3000/api/citas
```

### 🔟 **Obtener citas de hoy**
```
GET http://localhost:3000/api/citas/hoy
```

### 1️⃣1️⃣ **Obtener cita por ID**
```
GET http://localhost:3000/api/citas/1
```

### 1️⃣2️⃣ **Obtener citas por fecha**
```
GET http://localhost:3000/api/citas/fecha/2025-07-14
```

### 1️⃣3️⃣ **Crear nueva cita**
```
POST http://localhost:3000/api/citas
Content-Type: application/json

{
  "id_paciente": 1,
  "id_doctor": 1,
  "fecha_cita": "2025-07-15",
  "hora_inicio": "14:00",
  "hora_fin": "15:00",
  "motivo": "Consulta general",
  "estado": "Programada",
  "notas": "Primera consulta"
}
```

### 1️⃣4️⃣ **Actualizar cita**
```
PUT http://localhost:3000/api/citas/1
Content-Type: application/json

{
  "hora_inicio": "15:00",
  "hora_fin": "16:00",
  "notas": "Cita reprogramada"
}
```

### 1️⃣5️⃣ **Confirmar cita**
```
PATCH http://localhost:3000/api/citas/1/confirmar
```

### 1️⃣6️⃣ **Cancelar cita**
```
PATCH http://localhost:3000/api/citas/1/cancelar
```

### 1️⃣7️⃣ **Eliminar cita**
```
DELETE http://localhost:3000/api/citas/1
```

---

## 🛠️ **CONFIGURACIÓN DE POSTMAN**

### **Headers necesarios:**
Para todas las peticiones POST, PUT, PATCH:
```
Content-Type: application/json
```

### **Environment Variables (opcional):**
- `base_url`: `http://localhost:3000`

Entonces puedes usar: `{{base_url}}/api/pacientes`

---

## 🔍 **CASOS DE PRUEBA RECOMENDADOS**

### **Test 1: Flujo completo de paciente**
1. POST crear paciente
2. GET obtener el paciente creado
3. PUT actualizar información
4. GET verificar cambios
5. DELETE eliminar paciente

### **Test 2: Flujo completo de citas**
1. GET obtener pacientes disponibles
2. POST crear cita para un paciente
3. GET obtener citas de hoy
4. PATCH confirmar la cita
5. PUT modificar hora de la cita
6. PATCH cancelar la cita

### **Test 3: Dashboard y estadísticas**
1. GET dashboard para ver estadísticas
2. POST crear varios pacientes
3. POST crear varias citas
4. GET dashboard again para ver cambios

---

## ❌ **PRUEBAS DE ERRORES**

### **Datos inválidos:**
```
POST http://localhost:3000/api/pacientes
Content-Type: application/json

{
  "nombre": "",
  "telefono": "123"
}
```

### **ID inexistente:**
```
GET http://localhost:3000/api/pacientes/999
```

### **Endpoint inexistente:**
```
GET http://localhost:3000/api/inexistente
```

---

## 📝 **NOTAS IMPORTANTES**

1. **Datos persistentes**: Los datos se mantienen mientras el servidor esté corriendo
2. **Reinicio**: Al reiniciar el servidor, vuelven los datos fake originales
3. **CORS**: Está habilitado para desarrollo
4. **Logs**: El servidor muestra logs de todas las operaciones
5. **Validaciones**: Hay validaciones básicas en campos requeridos

---

## 🎯 **RESPUESTAS ESTÁNDAR**

### **Éxito:**
```json
{
  "success": true,
  "data": {...},
  "message": "Operación exitosa"
}
```

### **Error:**
```json
{
  "success": false,
  "message": "Descripción del error"
}
```

### **Error 404:**
```json
{
  "error": "Endpoint no encontrado",
  "path": "/api/ruta/inexistente"
}
```
