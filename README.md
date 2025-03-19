# Project-inventory

Este proyecto incluye un **backend** desarrollado con **NestJS**, un **frontend** desarrollado con **Angular**, y una base de datos **PostgreSQL** gestionada a través de Docker.

## Requisitos Previos

Antes de comenzar, asegúrate de tener las siguientes herramientas instaladas en tu sistema:

- [**Node.js**](https://nodejs.org/en/)
- [**Docker**](https://www.docker.com/get-started)
- [**Docker Compose**](https://docs.docker.com/compose/install/) (Viene incluido con Docker en versiones recientes)
- **npm** o **yarn** (Por defecto se usa npm)
- configurar achivos env para el backend y frontend
---
## Estructura del Proyecto
---
- **Backend (NestJS)**: Carpeta `/inventory-app`
- **Frontend (Angular)**: Carpeta `/inventory-front`

- 
### 1. Backend (NestJS) ![NestJS Logo](https://nestjs.com/img/logo_text.svg)

##Instalar dependencias
npm install

##Levanta la base de datos con Docke
docker compose up -d

##Levantar api
npm run start:dev
---
### 2. frontend (Angular) https://angular.io/assets/images/logos/angular/angular.svg
##Instalar dependencias
npm install

##Levantar frontend
ng serve
---



