This is a Next.js project bootstrapped with create-next-app.

# Proyecto de práctica con AuthJS

## Descripción

Este proyecto tiene como objetivo practicar el uso de la librería AuthJS para implementar autenticación utilizando los servicios de Google, GitHub y credenciales propias. Además, permite a los usuarios editar su información en un área de perfil.

## Funcionalidades

- Autenticación con Google
- Autenticación con GitHub
- Autenticación con credenciales propias

## Tecnologías Utilizadas

- AuthJS
- Bootstrap
- MongoDB
- Axios
- Zod
- Sass

# Características de la aplicación

La aplicación utiliza autenticación por credenciales propias, Google y GitHub. Almacena a los usuarios en una base de datos de MongoDB y cuenta con un área de perfil donde los usuarios pueden editar su información.

# Subida de imagenes

El proyecto actualmente puede realizar la subida de la imagen de perfil del usuario, esto lo hace por medio del endpoitn:

### `POST /api/user/profile-picture`

#### Request

```json
{
  "email": "email@test.com",
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA..."
}
```

Este endpoint realiza el envio de la imagen para que el micro servicio `https://github.com/JorgeMike/express-image-microservice` guarde la imagen