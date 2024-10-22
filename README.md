# SYS-BACKEND
API RESTful con Express, Node.js y TypeScript
## Descripción

Esta es una API RESTful para un sistema de ventas, creada con Express en Node.js y TypeScript, diseñada para proporcionar servicios backend escalables. El proyecto sigue una arquitectura modular y utiliza TypeScript para asegurar un código más limpio y seguro.

## Tecnologías utilizadas

- Node.js
- Express
- TypeScript
- Supabase
- Jenkins (para CI/CD)

## Prerrequisitos

- [Node.js](https://nodejs.org/dist/v20.18.0/node-v20.18.0-x64.msi) (versión 20 latest)

## Instalación
1. Clonar el repositorio:
```bash
   git clone https://github.com/enunez-dev/sys-backend.git
   cd <NOMBRE_DEL_PROYECTO>
```
2. Instalar dependencias:
```bash
    npm install
    # o si prefieres Yarn
    yarn install
```
3. Ejecutar el proyecto en modo desarrollo:
```bash
    npm run dev
    # o con Yarn
    yarn dev
```
## Despliegue con Jenkins (WINDOWS)
**Prerequisitos**:
- [Node.js](https://nodejs.org/dist/v20.18.0/node-v20.18.0-x64.msi) (versión 20 latest)
- **Instalacion de pm2**: PM2  es un administrador de procesos para aplicaciones Node.js que permite ejecutar y gestionar aplicaciones en producción.

    ```bash
    npm install pm2 -g
    ```
    Luego de instalar y cada vez que se reinicie el servidor ejecutar
    ```bash
    pm2 list
    ```
    Crear directorio .pm2
    ```bash
    cd C:\\tools & mkdir .pm2
    ```

#### Para configurar el despliegue automatizado con Jenkins, sigue los pasos a continuación:
- **Instalar Jenkins y los plugins necesarios**: Asegúrate de que Jenkins esté instalado y que los plugins para Node.js y Git estén instalados.
- **Configurar NodeJS (plugin)**: En jenkins ir a:
    ```markdown
    Dashboard > Manage Jenkins > Tools 
    ```
    y adicionar una instalacion de NodeJS
    - **Name**: NodeJS 20
    - **Installation directory**: Ruta donde esta instalado node ejm: C:\Program Files\nodejs
    - **Install automatically**: (uncheck)
    >![Logo de Node.js](https://firebasestorage.googleapis.com/v0/b/platziredux.appspot.com/o/nodejs.PNG?alt=media&token=6c5864e7-e0d4-42e5-a697-c05c56074663)

- **Configurar un nuevo pipeline**:
    1. New Item
        - Name: **sys-backend**
        - Type: Pipeline
    2. Pipeline
        - Definition: Pipeline script from SCM
            - SCM: Git
                - Repository URL: https://github.com/enunez-dev/sys-backend.git
                - Branch Specifier: */master
            - Script Path: Jenkinsfile
    3. (Save)
    4. Build Now

## Uso
Una vez en funcionamiento, la API estará disponible en http://localhost:3050 (o el puerto configurado). A continuación, se encuentran ejemplos de las rutas:

- GET localhost:3050/api/cliente/770641264 : Obtener datos del cliente por ci.

## Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.