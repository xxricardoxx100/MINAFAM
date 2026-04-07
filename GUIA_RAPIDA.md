## 🚀 GUÍA RÁPIDA DE INICIO

### Paso 1: Instalar Node.js y npm
Descarga desde https://nodejs.org/ (versión LTS recomendada)

### Paso 2: Abrir terminal en la carpeta del proyecto
```
cd c:\Users\ASUS\Desktop\MINAFAM
```

### Paso 3: Instalar dependencias
```
npm install
```
Esto descargará todos los paquetes necesarios (webpack, babel, etc.)
⏱️ Puede tomar 2-5 minutos la primera vez

### Paso 4: Iniciar servidor de desarrollo
```
npm run dev
```

✅ Se abrirá automáticamente en http://localhost:3000
✅ Los cambios se recargan automáticamente (hot reload)

---

## 📁 ESTRUCTURA RÁPIDA

```
src/
  ├── components/      ← Cada sección es un componente
  ├── styles/          ← CSS global
  ├── utils/           ← Funciones auxiliares
  └── index.js         ← Integra todo

public/
  └── index.html       ← Template vacío (webpack lo llena)

dist/                  ← OUTPUT después de npm run build
```

---

## ✏️ EDITAR CONTENIDO

### Cambiar data de Eventos
📄 `src/components/Eventos.js` → línea ~25-35
```javascript
const eventos = [
  { date: 'TU FECHA', title: 'TU EVENTO', ... }
]
```

### Cambiar Ministerios
📄 `src/components/Ministerios.js` → línea ~25-35

### Cambiar Iglesias
📄 `src/components/Iglesias.js` → línea ~28-35

### Cambiar Colores
📄 `src/styles/main.css` → línea ~8-25
```css
:root {
  --red: #c0392b;        ← Color principal
  --dark: #1a1a2e;       ← Color oscuro
  ...
}
```

---

## 📦 COMANDOS PRINCIPALES

| Comando | Función |
|---------|---------|
| `npm install` | Instalar dependencias |
| `npm run dev` | Servidor desarrollo (http://localhost:3000) |
| `npm run build` | Compilar para producción (carpeta dist/) |

---

## ⚠️ TROUBLESHOOTING

### Error: "npm command not found"
→ Instala Node.js desde https://nodejs.org/

### Error: "node_modules not found"
→ Ejecuta `npm install`

### Puerto 3000 en uso
El servidor intentará usar otro puerto automáticamente

### Los cambios no se actualizan
→ Presiona `Ctrl + Shift + R` (reload hard)

---

## 📤 PARA PRODUCCIÓN

1. Ejecuta: `npm run build`
2. Sube contenido de carpeta `dist/` a tu hosting
3. ¡Listo! El sitio está online

---

## 📚 DOCUMENTACIÓN

- Webpack: https://webpack.js.org/
- Babel: https://babeljs.io/
- Font Awesome: https://fontawesome.com/

---

¿Problemas? Revisa la consola (F12 → Console tab)
