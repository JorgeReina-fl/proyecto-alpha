# Guía de Estilos: Proyecto Alpha

Bienvenido a la guía de estilos del Proyecto Alpha. Este documento es la referencia principal para escribir y mantener el código CSS de la aplicación. El objetivo es crear una interfaz de usuario consistente, mantenible y de alta calidad.

## 1. Principios Fundamentales

Nuestra metodología de estilos se basa en tres pilares:

### a. CSS Modules

Todo el estilo de los componentes se realiza a través de **CSS Modules**.

- **¿Qué es?**: Es un sistema que crea nombres de clase únicos para cada componente, evitando colisiones y asegurando que los estilos de un componente no afecten a otros.
- **¿Cómo funciona?**: Cada componente `MiComponente.jsx` tiene un archivo de estilos asociado `MiComponente.module.css`. Al importar `styles from './MiComponente.module.css'`, las clases se convierten en un objeto con nombres únicos.

**Ejemplo de uso:**
```jsx
// En MiComponente.jsx
import styles from './MiComponente.module.css';

function MiComponente() {
  // La clase .title se convierte en algo como "MiComponente_title__a8f5e"
  return <h1 className={styles.title}>Hola Mundo</h1>;
}
```

### b. Nomenclatura BEM

Aunque CSS Modules evita colisiones, usamos la metodología **BEM (Bloque, Elemento, Modificador)** para que nuestras clases sean semánticas y legibles.

- **Bloque**: El componente principal. El nombre del bloque suele ser el del componente.
  - `.chat`, `.navbar`, `.login-page`
- **Elemento**: Una parte de un bloque. Se separa con doble guion bajo (`__`).
  - `.chat__messages`, `.navbar__logo`, `.login-page__form`
- **Modificador**: Una variación de un bloque o elemento. Se separa con doble guion (`--`).
  - `.chat__message--sent`, `.navbar__button--primary`

### c. Variables CSS (Tokens de Diseño)

Para mantener la consistencia visual, utilizamos **variables CSS** (también conocidas como tokens de diseño). Estas variables están definidas globalmente en `src/index.css` y deben ser la **primera opción** para colores, tipografías y espaciado.

**¡No uses valores hardcodeados (ej. `#f0f2f5`, `16px`)!** Usa las variables.

**Ejemplo de uso:**
```css
/* Mal ❌ */
.mi-boton {
  background-color: #007bff;
  color: #ffffff;
}

/* Bien ✅ */
.mi-boton {
  background-color: var(--primary-color);
  color: var(--surface-color);
}
```

---

## 2. Sistema de Diseño

### a. Paleta de Colores

Usa estas variables para todos los colores de la UI.

| Variable                 | Valor     | Uso                               |
| ------------------------ | --------- | --------------------------------- |
| `--primary-color`        | `#007bff` | Botones principales, enlaces, focos |
| `--secondary-color`      | `#6c757d` | Avatares, elementos secundarios   |
| `--success-color`        | `#28a745` | Notificaciones de éxito           |
| `--error-color`          | `#dc3545` | Notificaciones de error, alertas  |
| `--background-color`     | `#f8f9fa` | Color de fondo principal de la app|
| `--surface-color`        | `#ffffff` | Superficies de tarjetas, modales  |
| `--text-color`           | `#333`    | Texto principal y títulos         |
| `--text-secondary-color` | `#555`    | Texto secundario, placeholders    |

### b. Tipografía

- **Fuente Principal**: `system-ui` (la fuente nativa del sistema operativo del usuario).
  ```css
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  ```
- **Grosores**:
  - `400` (Regular): Párrafos y texto normal.
  - `600` (Semibold): Etiquetas y botones.
  - `700` (Bold): Títulos.

- **Tamaños de Fuente**: Se recomienda usar `rem` para la accesibilidad.
  - `0.8rem`, `1rem` (base), `1.25rem`, `1.5rem`, `2.25rem`.

### c. Espaciado y Layout

- **Unidad Base**: `1rem` (equivale a `16px` por defecto).
- **Espaciado**: Usa múltiplos de `0.25rem` para `padding`, `margin` y `gap`.
  - `gap: 0.5rem;`, `padding: 1.5rem;`
- **Radios de Borde**:
  - `8px`: Botones, inputs.
  - `12px`: Contenedores principales, tarjetas.
  - `18px`: Burbujas de chat.
  - `50%`: Avatares y elementos circulares.

---

## 3. Guía Práctica

### a. Estructura de Archivos

```
frontend/
└── src/
    ├── components/
    │   └── atoms/
    │   └── molecules/
    │   └── organisms/
    │       ├── MiComponente.jsx
    │       └── MiComponente.module.css  <-- Estilos aquí
    ├── pages/
    │   ├── MiPagina.jsx
    │   └── MiPagina.module.css          <-- Estilos aquí
    └── index.css                        <-- Variables y estilos globales
```

### b. Cómo Modificar un Estilo

1.  **Localiza el Componente**: Ve al archivo `.jsx` del componente que quieres cambiar.
2.  **Abre su CSS Module**: Abre el archivo `.module.css` correspondiente.
3.  **Edita la Clase**: Busca la clase BEM y modifica sus propiedades, **usando las variables CSS**.

**Ejemplo: Cambiar el color de un botón primario.**
1.  Abre `Button.module.css`.
2.  Encuentra la clase `.button--primary`.
3.  Si quisieras cambiar el color, lo ideal sería cambiar la variable `--primary-color` en `index.css` para que el cambio se propague por toda la app.

### c. Cómo Añadir un Nuevo Estilo

1.  **Añade el Elemento**: En el archivo `.jsx`, añade el nuevo elemento con su clase BEM.
    ```jsx
    <div className={styles['mi-bloque__nuevo-elemento']}>Contenido</div>
    ```
2.  **Define el Estilo**: En el archivo `.module.css`, añade la nueva clase y sus propiedades.
    ```css
    .mi-bloque__nuevo-elemento {
      padding: 1rem;
      border: 1px solid var(--secondary-color);
      border-radius: 8px;
    }
    ```

---

## 4. Diseño Adaptativo (Responsive)

- **Mobile-First**: Diseñamos primero para pantallas pequeñas y luego añadimos complejidad para pantallas más grandes.
- **Breakpoint Principal**: `768px` (tablets y escritorio).

**Ejemplo de Media Query:**
```css
/* Estilos base para móvil */
.navbar__container {
  padding: 0 1.5rem;
}

/* Estilos para pantallas más grandes */
@media (min-width: 768px) {
  .navbar__container {
    padding: 0 2.5rem;
  }
}
```

---
*Esta guía es un documento vivo. Si introduces un nuevo patrón de diseño o un token, por favor, actualízala.*
