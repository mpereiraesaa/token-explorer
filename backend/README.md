# 🚀 Backend

## 🛠️ Getting Started

Swagger OpenAPI documentation is available at [http://localhost:8080/api/v1](http://localhost:8080/api/v1).

### ⚙️ Environment Configuration

The environment variables are defined in the `env.template` sample file. The actual values are set within [docker-compose.yml](./backend/docker-compose.yml).

### Running the tests

1. **Install dependencies:**
  ```bash
  npm install
  ```

2. **Running tests:**
  ```bash
  npm run test
  ```

### 🏃‍♂️ Running the Project

The backend relies on Redis and MongoDB services, which are launched using Docker Compose. So you must have docker and docker-compose installed and set in your computer.

1. **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2. **Launch Docker Containers:**

    ```bash
    docker-compose up -d
    ```

This command will start the backend server along with Redis and MongoDB services in the host and port set in the environment variables.
