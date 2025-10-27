# AlphaChat: Aplicación de Chat en Tiempo Real

AlphaChat es una aplicación de chat full-stack construida con el stack MERN (MongoDB, Express, React, Node.js) y WebSockets para comunicación en tiempo real.

![AlphaChat Demo](https://via.placeholder.com/800x450.png?text=Añade+aquí+una+captura+de+pantalla+o+GIF)
*<p align="center">Agrega una captura de pantalla o un GIF de la aplicación aquí.</p>*

---

## 🌟 Sobre el Proyecto

Este proyecto fue desarrollado para demostrar una arquitectura de aplicación web moderna y escalable. Incluye autenticación de usuarios, mensajería instantánea, indicadores de "escribiendo...", y una lista de usuarios conectados en tiempo real.

### ✨ Características Principales

- **Autenticación de Usuarios**: Sistema de registro e inicio de sesión seguro con JWT (JSON Web Tokens).
- **Chat en Tiempo Real**: Comunicación bidireccional instantánea gracias a Socket.IO.
- **Notificaciones**: Alertas visuales para eventos clave como inicio/cierre de sesión.
- **Indicador de Escritura**: Muestra cuándo otro usuario está escribiendo un mensaje.
- **Lista de Usuarios**: Paneles que diferencian entre usuarios conectados y desconectados.
- **Diseño Adaptativo**: Interfaz de usuario funcional y estética en dispositivos móviles y de escritorio.
- **Estilo Moderno**: Uso de CSS Modules para un estilo encapsulado y mantenible.

---

## 🛠️ Tecnologías Utilizadas

El proyecto está dividido en un `backend` y un `frontend`, cada uno con su propio conjunto de tecnologías.

| Backend                               | Frontend                          |
| ------------------------------------- | --------------------------------- |
| **Node.js**                           | **React**                         |
| **Express**                           | **Vite**                          |
| **MongoDB (con Mongoose)**            | **Socket.IO Client**              |
| **Socket.IO**                         | **React Router**                  |
| **JSON Web Token (JWT)**              | **Axios**                         |
| **bcrypt.js**                         | **CSS Modules**                   |
| **dotenv**                            | **ESLint**                        |

---

## 🚀 Cómo Empezar

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### Prerrequisitos

Asegúrate de tener instalado lo siguiente:
- [Node.js](https://nodejs.org/es/) (versión 18.x o superior)
- [npm](https://www.npmjs.com/) (normalmente se instala con Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) (puedes usar una instancia local o un servicio en la nube como MongoDB Atlas)

### Instalación

1.  **Clona el repositorio**
    ```sh
    git clone https://github.com/tu-usuario/proyecto-alpha.git
    cd proyecto-alpha
    ```

2.  **Configura el Backend**
    - Navega a la carpeta del backend:
      ```sh
      cd backend
      ```
    - Instala las dependencias:
      ```sh
      npm install
      ```
    - Crea un archivo `.env` en la raíz de la carpeta `backend` y añade las siguientes variables de entorno:
      ```env
      # backend/.env
      PORT=5000
      MONGO_URI=tu_string_de_conexion_a_mongodb
      JWT_SECRET=tu_secreto_para_jwt_muy_seguro
      ```
      > **Nota**: Reemplaza los valores con tu configuración local. `JWT_SECRET` puede ser cualquier cadena de texto larga y aleatoria.

3.  **Configura el Frontend**
    - Navega a la carpeta del frontend desde la raíz del proyecto:
      ```sh
      cd ../frontend
      ```
    - Instala las dependencias:
      ```sh
      npm install
      ```
    - El frontend está configurado para conectarse al backend a través de un proxy definido en `vite.config.js`. No se necesita configuración adicional si el backend se ejecuta en el puerto `5000`.

### Ejecución

Debes tener dos terminales abiertas, una para el backend y otra para el frontend.

1.  **Ejecuta el Backend**
    - Desde la carpeta `backend`:
      ```sh
      npm run dev
      ```
    - El servidor se iniciará en `http://localhost:5000` (o el puerto que definiste en `.env`).

2.  **Ejecuta el Frontend**
    - Desde la carpeta `frontend`:
      ```sh
      npm run dev
      ```
    - La aplicación se abrirá en `http://localhost:5173` (o el puerto que Vite asigne).

¡Y listo! Ahora puedes registrar un nuevo usuario y empezar a chatear.

---

## 📁 Estructura del Proyecto

El repositorio está organizado como un monorepo con dos carpetas principales:

```
proyecto-alpha/
├── backend/
│   ├── controllers/  # Lógica de negocio para las rutas
│   ├── models/       # Esquemas de datos de Mongoose
│   ├── routes/       # Definiciones de rutas de la API
│   ├── config/       # Configuración de la base de datos y sockets
│   ├── middleware/   # Middlewares de Express (ej. autenticación)
│   ├── server.js     # Punto de entrada del servidor
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/ # Componentes reutilizables (átomos, moléculas, organismos)
    │   ├── context/    # Contextos de React (Auth, Socket, Notificaciones)
    │   ├── hooks/      # Hooks personalizados
    │   ├── pages/      # Componentes de página completos
    │   ├── router/     # Configuración de React Router
    │   └── main.jsx    # Punto de entrada de la aplicación React
    ├── STYLE_GUIDE.md  # Guía de estilos del frontend
    └── package.json
```

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar el proyecto, por favor sigue estos pasos:

1.  Haz un "Fork" del proyecto.
2.  Crea una nueva rama para tu funcionalidad (`git checkout -b feature/AmazingFeature`).
3.  Realiza tus cambios (`git commit -m 'Add some AmazingFeature'`).
4.  Sube tus cambios a la rama (`git push origin feature/AmazingFeature`).
5.  Abre un "Pull Request".

---

## 📄 Licencia

Distribuido bajo la Licencia MIT. Consulta `LICENSE.txt` para más información. (Nota: Debes añadir un archivo LICENSE).

---

## 📧 Contacto

Jorge Reina - [TuEmail@ejemplo.com](mailto:TuEmail@ejemplo.com)

Enlace del Proyecto: [https://github.com/tu-usuario/proyecto-alpha](https://github.com/tu-usuario/proyecto-alpha)
