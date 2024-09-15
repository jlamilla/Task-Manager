# Task Management System

Este es un sistema de gestión de tareas que permite la autenticación de usuarios y gestión de roles (Administrador, Supervisor, Empleado). Está construido utilizando **ASP.NET Core** para el back-end y **Angular** para el front-end. La base de datos es **PostgreSQL**.

## Requisitos

Antes de empezar, asegúrate de tener instalados los siguientes programas:

- [Docker](https://www.docker.com/get-started) y Docker Compose
- .NET SDK (si deseas ejecutar la API fuera de Docker)
- Node.js (si deseas ejecutar el front-end fuera de Docker)

## Estructura del proyecto

El repositorio está estructurado de la siguiente manera:

/Task-Manager 
 /TaskManagementAPI (Back-end en .NET) 
 /TaskManagementApp (Front-end en Angular) 
 /docker-compose.yml (Archivo de configuración para Docker) 
 /README.md (Este archivo)


## Configuración del entorno local con Docker

Para iniciar todos los servicios (API de .NET, aplicación Angular y PostgreSQL) utilizando Docker, sigue estos pasos:

### 1. Clona este repositorio:
   
   ```bash git clone https://github.com/tu-usuario/DVP-Task-Manager.git```
   ```cd Task-Manager```

    Construye y levanta los servicios utilizando Docker Compose:

    ```bash docker-compose up --build```
    
    Esto creará y levantará los siguientes servicios:

    * PostgreSQL: La base de datos estará accesible en el puerto 5432.
    * TaskManagementAPI (API .NET): Estará disponible en http://localhost:5000.
    * TaskManagementApp (Aplicación Angular): Estará disponible en http://localhost:4200.

### 2. Detener el entorno:
    
    Para detener todos los contenedores y servicios, ejecuta:

    ```bash docker-compose down```

### 3. Configuración personalizada:
    
    * La conexión a la base de datos PostgreSQL está configurada en el archivo appsettings.json de la API de .NET:

    ```json
    {
        "ConnectionStrings": {
            "DefaultConnection": "Host=postgres-db;Port=5432;Database=task_management_db;Username=tu_usuario;Password=tu_contraseña"
        }
    }
    ```

## Ejecución de los proyectos sin Docker (Opcional)

### Back-end (.NET)

Si prefieres ejecutar la API sin Docker, sigue estos pasos:

1. Ve a la carpeta TaskManagementAPI:

```bash cd TaskManagementAPI```

2. Restaura las dependencias y ejecuta el proyecto:

```bash dotnet restore``` 
```bash dotnet run``` 

Esto levantará la API en http://localhost:5000.

### Front-end (Angular)

Si prefieres ejecutar la aplicación Angular sin Docker:

1. Ve a la carpeta TaskManagementApp:

```bash cd TaskManagementApp```

2. Instala las dependencias y ejecuta la aplicación:

```bash npm install```
```bash ng serve```

Esto levantará la aplicación en http://localhost:4200.

### Pruebas y Consideraciones

* Asegúrate de que el contenedor de PostgreSQL esté en ejecución antes de iniciar la API de .NET, ya que depende de la base de datos.
* Si estás ejecutando los proyectos fuera de Docker, asegúrate de que las configuraciones de las conexiones a la base de datos sean correctas.

### Información adicional

Este proyecto incluye autenticación de usuarios con JWT (JSON Web Tokens) y sistema de roles. Cada rol tiene diferentes permisos sobre las operaciones de tareas y usuarios.

¡Gracias por revisar este proyecto!