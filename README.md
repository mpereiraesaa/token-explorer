# Jumper

## Project Overview

This is a web application that allows users to log in with an EVM wallet, fetches ERC20 tokens associated with their Ethereum address, and displays the tokens using the provided frontend. The application features include a secure login system, and an intuitive user interface. This project uses React with Next.js for the frontend and Node.js, Express, and TypeScript for the backend.

### Development process

To review the assumptions made during the development process and decisions made that lead to the final result, refer to the [Development process](./development-process.md) summary.

## Getting Started

There are two main directories in this repository, each with a `README.md` file containing more information about their respective setup and usage:

- `frontend`: Contains the Next.js react application.
- `backend`: Contains the Node.js application with TypeScript, featuring RESTful API endpoints and integrated with Redis and MongoDB for data management.

### Frontend

The frontend is a Next.js application set up with Material UI. For detailed setup instructions, refer to the [frontend README](./frontend/README.md).

### Backend

The backend is an Express.js application using TypeScript. For detailed setup instructions, refer to the [backend README](./backend/README.md).

## Running the Project with Docker

To launch the entire backend infrastructure locally with Docker:

1. **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2. **Launch Docker Containers:**

    ```bash
    docker-compose up -d
    ```

This command will start the backend server along with Redis and MongoDB services. Currently the file `docker-compose.yml` is setting host `localhost` and port `8080` so base URL for the API is then [http://localhost:8080/api/v1](http://localhost:8080/api/v1).

Next, to load the frontend UI you can follow these steps:

### Step 1: 🚀 Initial Setup

- Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

- Install dependencies:

    ```bash
    npm install
    ```

### Step 2: ⚙️ Environment Configuration

- Create an `.env.development` file in the root of the `frontend` directory with the following content:

    ```env
    NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
    ```

This environment variable points to the backend API URL.

### Step 3: 🏃‍♂️ Running the Project

- Run Development Server:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

### Step 4: 🌐 Open the Application

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Next Steps:
- Explore the frontend by navigating to `http://localhost:3000`
- Use the API documentation to start interacting directly with the API endpoints without using the frontend.
