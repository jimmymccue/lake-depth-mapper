# Lake Mapper

Lake Mapper is an application designed to record lake depth readings with corresponding GPS coordinates. These depth points will eventually be used to generate contour maps and visualize underwater topography.

The application consists of a React frontend and a Spring Boot backend, supported by an H2 in-memory database during development.

---

## Table of Contents

- [Purpose](#purpose)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Installation](#installation)
- [Frontend Overview](#frontend-overview)
- [Backend Overview](#backend-overview)
- [API Endpoints](#api-endpoints)
- [Project Status](#project-status)
- [Author](#author)

---

## Purpose

Lake Mapper allows users to record:

- Lake depth measurements in feet.
- Automatically captured GPS coordinates using the Google Maps API.

These depth points will later support contour map generation.

---

## Features

### **Frontend**

- Depth input form
- Automatic GPS coordinate retrieval via Google Maps API
- Display of recorded depth and location information

### **Backend**

- Full CRUD support for depth readings
- H2 in-memory database for development
- `/api/depth-readings` endpoint group
- H2 console enabled for debugging

---

## Tech Stack

### **Frontend**

- React 19.1.1
- Vite 7.1.7
- TypeScript 5.9.3
- Tailwind CSS 4.1.14
- npm
- Google Maps API

### **Backend**

- Java 17
- Spring Boot 3.5.7
- Spring Web
- Spring Data JPA
- H2 Database (development)

---

## Repository Structure

```
/LakeMapper/
  README.md
  frontend/
  backend/
```

---

# Installation

Clone the repository:

```
git clone https://github.com/jimmymccue/lake-depth-mapper.git
cd LakeMapper # or whatever folder name you want locally
```

---

# Frontend Overview

### Install dependencies:

```
cd frontend
npm install
```

### Run the development server:

```
npm run dev
```

The app runs on:

```
http://localhost:5173
```

### Environment Variables

Create:

`.env.development`

```
VITE_GOOGLE_MAPS_API_KEY=your_dev_key_here
```

`.env.production`

```
VITE_GOOGLE_MAPS_API_KEY=your_prod_key_here
```

The frontend currently:

- Accepts depth input
- Retrieves coordinates via Google Maps
- Displays results locally
- Does _not yet_ submit data to backend

---

# Backend Overview

### Run the backend:

```
cd backend
mvn spring-boot:run
```

Backend runs at:

```
http://localhost:8080
```

### H2 Console

```
http://localhost:8080/h2-console
```

Typical config:

- JDBC URL: `jdbc:h2:mem:testdb`
- User: `admin`
- Password: _(empty)_

---

# API Endpoints

Base URL:

```
/api/depth-readings
```

### **POST** `/api/depth-readings`

Create a new depth reading.

### **GET** `/api/depth-readings`

Get all depth readings.

### **GET** `/api/depth-readings/{id}`

Get a reading by ID.

### **PUT** `/api/depth-readings/{id}`

Update a reading.

### **DELETE** `/api/depth-readings/{id}`

Delete a reading.

---

# Project Status

- Frontend UI complete for local capture of depth + coordinates
- Backend CRUD fully operational
- Frontend/backend integration is the next development step

Lake Mapper is actively evolving and will grow into a full lake contour generation platform.

## Author

**Jimmy M. McCue III**  
GitHub: [jimmymccue](https://github.com/jimmymccue)  
Email: jimmy.mccue.614@gmail.com
