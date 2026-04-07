## 📖 DOCUMENTACIÓN COMPLETA

### Arquitectura del Proyecto

El proyecto está estructurado siguiendo el patrón **Component-Based Architecture**:

1. **Componentes**: Cada sección es independiente con su lógica (render + mount)
2. **Estilos**: CSS centralizado con variables reutilizables
3. **Utils**: Funciones compartidas (scroll, validaciones, etc.)
4. **Webpack**: Bundler que compila todo en archivos optimizados

---

## 🎯 Cómo Funciona

### 1. Punto de Entrada: `src/index.js`

```javascript
class App {
  init() {
    this.loadComponents();    // Crea instancias de componentes
    this.attachGlobalEvents();  // Eventos globales (scroll, smooth)
    this.initializeComponents(); // Monta cada componente
  }
}
```

**Flujo:**
- DOM cargado → Se importan componentes → Se renderizan → Se montan eventos

### 2. Estructura de un Componente

```javascript
export class Navbar {
  render() {
    // Retorna HTML string
    return `<header id="navbar">...</header>`;
  }

  mount() {
    // Se ejecuta cuando está en el DOM
    this.navbar = document.getElementById('navbar');
    this.attachEvents();  // Aquí se escuchan clicks, scroll, etc.
  }

  attachEvents() {
    // Event listeners
  }
}
```

**Ciclo de vida:**
1. `render()` → genera HTML
2. HTML se inserta al DOM
3. `mount()` → se ejecuta, obtiene referencias del DOM
4. `attachEvents()` → escucha eventos

### 3. Estilos CSS

Variables globales en `src/styles/main.css`:

```css
:root {
  --red: #c0392b;           /* Color principal */
  --dark: #1a1a2e;          /* Fondo oscuro */
  --light: #f8f9fa;         /* Fondo claro */
  --shadow-md: 0 6px 24px rgba(0,0,0,.15);  /* Sombra */
  --transition: .3s ease;   /* Duración de animaciones */
}

/* Uso */
.btn-primary {
  background: var(--red);
  transition: background var(--transition);
}
```

### 4. Webpack: Cómo Compila

```
src/index.js
├── Importa componentes
├── Importa main.css
├── Babel transpila JS moderno → ES5
├── CSS se extrae a archivo separado
└── HTML Plugin genera index.html automático

↓

dist/
├── bundle.[hash].js    ← JavaScript compilado
├── styles.[hash].css   ← CSS minimizado
└── index.html          ← HTML con referencias automáticas
```

---

## 🔧 EDITAR COMPONENTES

### Agregar nuevo evento

**Archivo:** `src/components/Eventos.js`

```javascript
renderEventos() {
  const eventos = [
    // Agregar aquí
    { 
      date: '10 Junio, 2026', 
      title: 'Mi Evento', 
      desc: 'Descripción', 
      location: 'Lugar',
      img: 'https://imagen.com/foto.jpg' 
    },
  ];
  return eventos.map(e => `<article>...</article>`).join('');
}
```

Cambios se reflejan instantáneamente con `npm run dev` (hot reload).

### Cambiar color principal

**Archivo:** `src/styles/main.css` ~ línea 12

```css
:root {
  --red: #FF0000;  ← Cambia aquí
}
```

Todos los elementos que usen `var(--red)` cambiarán automáticamente.

### Agregar nuevo ministerio

**Archivo:** `src/components/Ministerios.js` ~ línea 25

```javascript
const ministerios = [
  // Existentes
  ...
  // Nuevo
  { 
    icon: 'fa-heart-pulse', 
    title: 'Mi Ministerio', 
    desc: 'Descripción del ministerio' 
  },
];
```

---

## 🎨 PERSONALIZACIÓN

### Tipografía

Cambiar en `src/styles/main.css`:

```css
:root {
  --font-main: 'Montserrat', sans-serif;    ← Títulos
  --font-body: 'Open Sans', sans-serif;     ← Texto
}
```

O agregar nuevas en `src/index.js` en `loadFonts()`:

```javascript
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=...';
document.head.appendChild(link);
```

### Breakpoints Responsivos

Editables en `src/styles/main.css` (buscar `@media`):

```css
@media (max-width: 1100px) { /* Tablets grandes */ }
@media (max-width: 900px) { /* Tablets */ }
@media (max-width: 768px) { /* Móvil horizontal */ }
@media (max-width: 540px) { /* Móvil pequeño */ }
```

---

## 📱 OPTIMIZACIONES DE RENDIMIENTO

✅ **Code Splitting**: Cada componente se carga bajo demanda
✅ **CSS Minimizado**: Size reducido en producción
✅ **Image Optimization**: Usa imágenes externas (Unsplash)
✅ **Lazy Loading**: Componentes se montan al scroll
✅ **Cache Busting**: Hash automático en nombres de archivos

---

## 🐛 DEBUG

### Ver errores en consola

1. Abre DevTools: `F12`
2. Tab: `Console`
3. Revisa mensajes de error rojo

### Inspeccionar elementos

1. `F12` → `Elements` tab
2. Selecciona elemento
3. Visualiza HTML y CSS aplicado

### Network

1. `F12` → `Network` tab
2. Recarga página
3. Ver descargas y tiempos

---

## 📦 DEPENDENCIAS

**Producción:**
- `axios`: Para peticiones HTTP (si necesitas backend)

**Desarrollo (automáticas):**
- `webpack`: Bundler
- `babel`: Transpilador
- `webpack-dev-server`: Servidor con hot reload
- `html-webpack-plugin`: Genera HTML automático
- `mini-css-extract-plugin`: Extrae CSS a archivo
- `express`: Servidor Node.js

---

## 🚀 DEPLOYMENT

### En Netlify (Recomendado)

1. GitHub: Sube el repo
2. Netlify: Conecta repo
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy

### En Vercel

1. GitHub: Sube el repo
2. Vercel: Conecta repo
3. Build command: `npm run build`
4. Output directory: `dist`

### En servidor propio

```bash
npm run build          # Genera dist/
# Copia contenido de dist/ a servidor
```

---

## 📚 RECURSOS

- **Webpack Docs**: https://webpack.js.org/
- **Babel Guide**: https://babeljs.io/docs/
- **Font Awesome**: https://fontawesome.com/icons
- **Google Fonts**: https://fonts.google.com/

---

## ❓ PREGUNTAS FRECUENTES

**P: ¿Cómo cambio el contenido del sitio?**
R: Edita los archivos en `src/components/` y guarda. Con `npm run dev`, los cambios se reflejan automáticamente.

**P: ¿Puedo usar este proyecto sin Node.js?**
R: Los archivos originales (`index.html`, `styles.css`, `script.js`) funcionan sin Node.js. Este setup es para desarrollo moderno.

**P: ¿Cómo agrego un backend?**
R: Importa `axios` y crea un utility que haga peticiones POST a tu servidor.

**P: ¿Cómo hospedo el sitio?**
R: Genera el build (`npm run build`) y sube la carpeta `dist/` a Netlify, Vercel o tu servidor.

---

**Última actualización:** Marzo 2026
