# Frontend Angular para Sistema de Empleos

Este proyecto es el frontend desarrollado en Angular 19 para consumir la API del backend Spring Boot.

## Proyecto Creado con Video Coding

Este proyecto fue desarrollado utilizando video coding con herramientas CLI modernas:

- **iFlow CLI**: Interfaz de línea de comandos para desarrollo ágil
- **OpenCode**: Herramientas de desarrollo colaborativo
- **Video Coding**: Proceso de desarrollo en vivo grabado

El uso de estas herramientas permite una experiencia de desarrollo más eficiente y colaborativa.

## Requisitos

- Node.js (v22 o superior)
- npm (v11 o superior)
- Angular CLI (v19)

## Instalación

1. Clonar o descargar el proyecto.
2. Instalar dependencias:

```bash
npm install
```

## Configuración

El backend debe estar ejecutándose en `http://localhost:8080`. Se ha configurado un proxy para redirigir las peticiones `/auth` y `/api` al backend (ver `proxy.conf.json`).

## Ejecución en desarrollo

```bash
npm start
```

La aplicación se abrirá en `http://localhost:4200`.

## Estructura del proyecto

- `src/app/components/`: Componentes de la interfaz (login, home, profile).
- `src/app/services/`: Servicios para comunicación con la API (auth.service.ts).
- `src/app/interceptors/`: Interceptores HTTP (auth.interceptor.ts).
- `src/app/app.routes.ts`: Definición de rutas.

## Funcionalidades implementadas

- **Login**: Autenticación con JWT, almacenamiento de token en localStorage.
- **Home**: Página principal con mensaje de bienvenida y botón de logout.
- **Profile**: Página de perfil (placeholder).
- **Guard de autenticación**: Pendiente de implementar.

## Conectar con el backend

Asegúrate de que el backend Spring Boot esté en ejecución. El backend ya tiene configurado CORS para permitir solicitudes desde `http://localhost:4200`.

## Credenciales de prueba

Consulta la base de datos del backend para usuarios de prueba (e.g., `admin` / `admin`).

## Próximos pasos

- Implementar guard de autenticación para proteger rutas.
- Consumir endpoints de empleos, vacantes, solicitudes.
- Mejorar UI/UX con un framework como Angular Material o Bootstrap.
- Gestionar estado global con NgRx o servicios.
