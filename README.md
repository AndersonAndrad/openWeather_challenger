# OpenWeather Challenger

## 📌 Project Description

The **OpenWeather Challenger** is a Node.js-based API service that fetches weather data using the WeatherAPI. It
provides endpoints for retrieving weather information based on city names. The project follows best practices, including
Dockerization, testing with Jest, and Swagger API documentation.

## 🛠️ Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (>=16.x)
- **npm** (comes with Node.js)
- **Docker & Docker Compose** (if running with Docker)

## 🚀 Cloning the Repository

To clone the repository, run:

```sh
git clone https://github.com/AndersonAndrad/openWeather_challenger.git
cd openWeather_challenger
```

## ⚙️ Configuration

The project uses environment variables stored in a `.env` file.
Create a `.env` file in the root directory:

```sh
touch .env
```

Add the following configuration:

```env
APP_PORT=3000
WEATHER_API_KEY=your_weather_api_key_here
WEATHER_URL=https://api.weatherapi.com/v1
```

> **Note:** Replace `your_weather_api_key_here` with your actual WeatherAPI key.

## 🐳 Running with Docker

Build and start the containerized application:

```sh
docker-compose up --build -d
```

Check running containers:

```sh
docker ps
```

To stop the containers:

```sh
docker-compose down
```

## 🔥 Running the Application

If running locally without Docker, install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

## 🧪 Running Tests

To execute tests and check coverage:

```sh
npm run test
```

Check test coverage:

```sh
npm run test:coverage
```

## 📜 Swagger API Documentation

Swagger UI is available at:

```
http://localhost:3000/api/v1/api-docs
```

To configure Swagger, update `routes.ts`:

```typescript
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json';

...
this.router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
```

## 🎯 Project Scripts

| Script          | Description                           |
|-----------------|---------------------------------------|
| `npm run dev`   | Starts the server in development mode |
| `npm run build` | Compiles TypeScript to JavaScript     |
| `npm start`     | Runs the compiled server              |
| `npm run test`  | Runs unit tests                       |
| `npm run lint`  | Runs ESLint to fix code style issues  |

## 🤝 Contribution

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch`
3. Commit changes: `git commit -m "Added new feature"`
4. Push to the branch: `git push origin feature-branch`
5. Create a pull request

## 📄 License

This project is licensed under the MIT License.

