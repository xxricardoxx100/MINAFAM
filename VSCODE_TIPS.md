// VS CODE - CONFIGURACIÓN RECOMENDADA

{
  // .vscode/settings.json
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "javascript.updateImportsOnFileMove.enabled": "always",
  "files.exclude": {
    "node_modules": true,
    "dist": true,
    ".git": true
  },
  "search.exclude": {
    "node_modules": true,
    "dist": true
  }
}

════════════════════════════════════════════════════════════════════════════

// .vscode/extensions.json - Extensiones recomendadas:

{
  "recommendations": [
    "esbenp.prettier-vscode",           // Prettier - Code formatter
    "dbaeumer.vscode-eslint",           // ESLint
    "ritwickdey.LiveServer",            // Live Server
    "ms-vscode.vscode-typescript-next", // TypeScript
    "bradlc.vscode-tailwindcss",        // Color hints
    "vincaslt.highlight-matching-tag",  // Highlight matching tags
  ]
}

════════════════════════════════════════════════════════════════════════════

ATAJOS ÚTILES EN VS CODE:

Ctrl + J          Abrir/cerrar terminal integrada
Ctrl + S          Guardar archivo
Ctrl + Shift + D  Abrir debug
F5                Iniciar debug
Ctrl + `          Toggle terminal

════════════════════════════════════════════════════════════════════════════

EJECUTAR COMANDOS EN VS CODE:

1. Terminal integrada:
   - Ctrl + `  (abre terminal)
   - npm run dev
   - npm run build

2. Tasks (Ctrl+P):
   - >Tasks: Run Task
   - Selecciona "npm run dev"

════════════════════════════════════════════════════════════════════════════

ESTRUCTURA EN VS CODE - VISTA RECOMENDADA:

📁 MINAFAM
 ├─ 📁 src/
 │  ├─ 📁 components/         ← Aquí editas el contenido
 │  │  ├─ Navbar.js
 │  │  ├─ Eventos.js
 │  │  ├─ Ministerios.js
 │  │  └─ ...
 │  ├─ 📁 styles/
 │  │  └─ main.css             ← Aquí cambias colores
 │  ├─ 📁 utils/
 │  └─ index.js                ← Punto de entrada
 │  
 ├─ 📁 public/
 │  └─ index.html              ← Template (webpack)
 │
 ├─ 📁 dist/                   ← OUTPUT (no editar)
 │
 ├─ package.json               ← Scripts y dependencias
 ├─ webpack.config.js          ← Configuración build
 └─ README.md                  ← Documentación

════════════════════════════════════════════════════════════════════════════

FLUJO DE TRABAJO EN VS CODE:

1. Abre carpeta:    Archivo → Abrir Carpeta → MINAFAM

2. Terminal integrada: Ctrl + `

3. npm install      (primera vez)

4. npm run dev      (inicia servidor)

5. Edita archivos en src/
   - Cambios se reflejan en http://localhost:3000 automáticamente
   - No necesitas presionar F5

6. Ctrl+S para guardar (aunque es automático)

════════════════════════════════════════════════════════════════════════════

DEBUG EN VS CODE:

1. Abre DevTools en navegador: F12
2. Console tab → Revisa errores rojos
3. Elements tab → Inspecciona HTML
4. Network tab → Ver peticiones

O usa el debugger integrado:
  1. Crea .vscode/launch.json
  2. Presiona F5 para iniciar
  3. Breakpoints en el código (click en número de línea)

════════════════════════════════════════════════════════════════════════════

EDITAR COMPONENTES EN VS CODE:

Ejemplo - Agregar evento:

ARCHIVO: src/components/Eventos.js

  renderEventos() {
    const eventos = [
      { 
        date: 'TU FECHA', 
        title: 'Tu Evento',
        desc: 'Descripción',
        location: 'Lugar',
        img: 'URL imagen' 
      },  ← Agrega aquí tu evento
    ];
  }

Guardar (Ctrl+S) → Hot reload automático → http://localhost:3000 actualiza

════════════════════════════════════════════════════════════════════════════

CAMBIAR COLORES EN VS CODE:

ARCHIVO: src/styles/main.css

  :root {
    --red: #c0392b;      ← Click + Shift click para selector color
    --dark: #1a1a2e;
    --light: #f8f9fa;
  }

Instala extensión "Color Picker" para mayor facilidad

════════════════════════════════════════════════════════════════════════════

BÚSQUEDA EN VS CODE:

Ctrl + F         Buscar en archivo actual
Ctrl + H         Buscar y reemplazar
Ctrl + Shift + F Buscar en todo el proyecto

Ejemplo:
  Busca: "class Navbar"
  Resultado: src/components/Navbar.js

════════════════════════════════════════════════════════════════════════════

GIT EN VS CODE:

Ctrl + Shift + G  Panel Control de Código Fuente

1. Initialize Repository
   - Click en Initialize Repository
   - Commits iniciales

2. Push a GitHub
   - Necesitas cuenta GitHub
   - Add Remote URL
   - Push (Ctrl + Shift + P → Git: Push)

════════════════════════════════════════════════════════════════════════════

TROUBLESHOOTING EN VS CODE:

Terminal no reconoce npm?
  → Reinicia VS Code completamente
  → O abre cmd/powershell externa

npm install falla?
  → Abre PowerShell como admin
  → npm install --legacy-peer-deps

Los cambios no se ven?
  → F5 en navegador (reload)
  → Ctrl+Shift+R (hard reload)

Errores en console?
  → F12 en navegador → Console
  → Búsca stack trace

════════════════════════════════════════════════════════════════════════════

EXTENSIONES RECOMENDADAS PARA INSTALAR:

1. Prettier          (formatter)
2. ESLint            (linter)
3. Live Server       (preview local)
4. Thunder Client    (API testing)
5. Todo Tree         (manage TODOs)
6. GitLens           (git visualization)
7. Bracket Pair Colorizer (nested brackets)
8. Better Comments   (enhance comments)

════════════════════════════════════════════════════════════════════════════

CREAR NUEVO COMPONENTE (Template):

Archivo: src/components/MiComponente.js

export class MiComponente {
  render() {
    return `
      <section id="mi-seccion" class="section mi-seccion">
        <div class="container">
          <h2>Mi Componente</h2>
          <p>Contenido aquí</p>
        </div>
      </section>
    `;
  }

  mount() {
    // Event listeners aquí
    const element = document.getElementById('mi-seccion');
    element.addEventListener('click', () => {
      console.log('Clicked!');
    });
  }
}

Luego en src/index.js:
  1. Importa: import { MiComponente } from './components/MiComponente';
  2. Renderiza: body.insertAdjacentHTML('beforeend', miComponente.render());
  3. Monta: this.components.push({ instance: miComponente, mount: () => miComponente.mount() });

════════════════════════════════════════════════════════════════════════════

TIP PRODUCTIVIDAD:

Usa Emmet para autocompletar HTML:

  div.container>section#hero.hero
  
  Presiona Tab → Genera HTML con estructura

════════════════════════════════════════════════════════════════════════════

RECURSOS DE VS CODE:

Documentación:  https://code.visualstudio.com/docs
Tips & Tricks:  https://code.visualstudio.com/tips-and-tricks
Keyboard:       https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows

════════════════════════════════════════════════════════════════════════════
