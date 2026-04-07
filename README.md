# MINAFAM - Ministerio de Familias 🙏

Sitio web modular para el Ministerio de Familias con **Node.js + Express + EJS**. Cada sección tiene su propia ruta dinámica.

## 📁 Estructura del Proyecto

```
MINAFAM/
├── app.js                    # Servidor Express principal
├── package.json              # Dependencias
├── .env                      # Variables de entorno
├── README.md                 # Este archivo
│
├── data/                     # 📊 Datos en JSON (súper fáciles de modificar)
│   ├── ministerios.json      # 8 ministerios con detalles
│   ├── iglesias.json         # 6 iglesias con ubicaciones
│   ├── eventos.json          # 6 eventos próximos
│   └── testimonios.json      # 5 testimonios
│
├── public/                   # 🎨 Archivos estáticos
│   ├── css/
│   │   └── styles.css        # Todos los estilos (responsive)
│   ├── js/
│   │   └── main.js           # Interactividad (animaciones, forms)
│   └── images/               # (Agregar imágenes aquí)
│
└── views/                    # 📄 Templates EJS (HTML dinámico)
    ├── layout.ejs            # Layout principal (navbar + footer)
    ├── inicio.ejs            # Página de inicio
    ├── eventos.ejs           # Listado de eventos
    ├── como-ser-parte.ejs    # Cómo ser parte
    ├── contacto.ejs          # Formulario de contacto
    ├── 404.ejs               # Error 404
    ├── ministerios/
    │   ├── index.ejs         # 📍 /ministerios
    │   └── detalle.ejs       # 📍 /ministerios/:id
    └── iglesias/
        ├── index.ejs         # 📍 /iglesias
        └── detalle.ejs       # 📍 /iglesias/:id
```

## 🌐 Rutas del Sitio

| Ruta | Tipo | Descripción |
|------|------|-------------|
| `/` | GET | Página principal con hero + stats + preview |
| `/ministerios` | GET | Listado todos los ministerios |
| `/ministerios/:id` | GET | Detalle de 1 ministerio específico |
| `/iglesias` | GET | Listado todas las iglesias |
| `/iglesias/:id` | GET | Detalle 1 iglesia (e.g., `/iglesias/iglesia-pvitarte`) |
| `/eventos` | GET | Listado todos los eventos |
| `/como-ser-parte` | GET | Página con 4 pasos para unirse |
| `/contacto` | GET | Formulario de contacto + datos |
| `/contacto` | POST | Envía el formulario (simulado) |

## 🚀 Instalación en 5 Minutos

### 1️⃣ Descarga Node.js
Si no lo tienes, ve a [nodejs.org](https://nodejs.org/) y descarga la versión LTS.

### 2️⃣ Abre la terminal en la carpeta MINAFAM
```bash
cd c:\Users\ASUS\Desktop\MINAFAM
```

### 3️⃣ Instala las dependencias
```bash
npm install
```
Esto descarga Express, EJS, Morgan y otras herramientas.

### 4️⃣ Inicia el servidor

**Modo desarrollo (con auto-reload):**
```bash
npm run dev
```

**O modo producción:**
```bash
npm start
```

### 5️⃣ Abre en el navegador
```
http://localhost:3000
```

¡**Listo!** 🎉 Ya está corriendo tu sitio.

## ✏️ Cómo Modificar Datos

### Agregar un Ministerio
Edita `data/ministerios.json`:
```json
{
  "id": "nuevo-ministerio",
  "nombre": "Nombre del Ministerio",
  "icon": "fa-heart",
  "descripcion": "Descripción corta",
  "descriptionLarga": "Descripción larga con más detalles",
  "actividades": [
    "Actividad 1",
    "Actividad 2"
  ],
  "lider": "Nombre del Líder",
  "contacto": "email@minafam.org"
}
```

Luego estará disponible en:
- `/ministerios` (en el listado)
- `/ministerios/nuevo-ministerio` (detalle individual)

### Agregar una Iglesia
El mismo proceso con `data/iglesias.json`. Ejemplo:
- URL: `/iglesias/iglesia-central`
- URL: `/iglesias/iglesia-pvitarte`

### Agregar Eventos
Edita `data/eventos.json`:
```json
{
  "id": "mi-evento",
  "nombre": "Nombre del Evento",
  "fecha": "2026-05-15",
  "hora_inicio": "14:00",
  "ubicacion": "Lugar",
  "descripcion": "...",
  "tags": ["familia", "evento"]
}
```

## 🎨 Personalización

### Cambiar Colores
Edita `public/css/styles.css` línea 8-10:
```css
:root {
  --red: #c0392b;        /* Rojo principal - cambia aquí */
  --dark: #1a1a2e;       /* Azul oscuro */
  --light: #f8f9fa;      /* Gris claro */
}
```

###  Cambiar Título de la Página
En cada ruta de `app.js`:
```javascript
res.render('vista', { 
  title: 'Mi Título Personalizado'
});
```

## 🔍 Ejemplos de URLs Dinámicas

**Ministerios:**
- `/ministerios` → Todos
- `/ministerios/matrimonios` → Detalle
- `/ministerios/jovenes` → Detalle
- `/ministerios/ninos` → Detalle

**Iglesias:**
- `/iglesias` → Todas
- `/iglesias/iglesia-central` → Detalle
- `/iglesias/iglesia-pvitarte` → Detalle
- `/iglesias/iglesia-villa` → Detalle

**Eventos:**
- `/eventos` → Todos los eventos

## 🛠 Troubleshooting

### ❌ "Port already in use"
El puerto 3000 está siendo usado. Cambia en `.env`:
```env
PORT=3001
```

### ❌ "Cannot find module express"
Instala dependencias:
```bash
npm install
```

### ❌ Las páginas no cargan
1. Asegúrate de que el servidor está corriendo (`npm run dev`)
2. Recarga la página (`Ctrl + F5`)
3. Revisa la consola del servidor para errores

### ❌ Los estilos no se ven
Los estilos están en `public/css/`, asegúrate de que el servidor está corriendo.

## 📦 Dependencias Principales

| Paquete | Uso |
|---------|-----|
| `express` | Framework web servidor |
| `ejs` | Motor de templates HTML |
| `morgan` | Logger de requests HTTP |
| `dotenv` | Variables de entorno |
| `nodemon` | Auto-reload en desarrollo |

## 📱 Responsive Design

El sitio se adapta perfectamente a:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1200px+)

## 📝 Agregar una Nueva Sección

1. **Crea el JSON en `data/`** (si es necesario)
2. **Crea el template en `views/`**
3. **Agrega la ruta en `app.js`**:
   ```javascript
   app.get('/mi-seccion', (req, res) => {
     res.render('mi-seccion', { title: 'Mi Sección' });
   });
   ```
4. **Agrega el link en `views/layout.ejs`** (navbar)

## 🚀 Deploy

### En Heroku:
1. Instala Heroku CLI
2. `heroku create my-minafam`
3. `git push heroku main`

### En Vercel/Netlify:
Necesitarías ajustar la config para serverless functions.

### En un VPS/Hosting:
1. `npm run` (ya hay npm en el servidor)
2. Usa PM2 para mantener el servidor activo
3. Configura Nginx como proxy reverso

## 📧 Contacto y Soporte

Para preguntas sobre actualización del sitio, contacta al equipo técnico.

---

**© 2026 MINAFAM – Ministerio de Familias** ❤️
