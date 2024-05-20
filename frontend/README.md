# 🚀 Frontend

## Overview

The frontend is a Next.js application designed to interact with an Ethereum wallet and display ERC20 tokens associated with a user's Ethereum address. This application is styled using Material UI and leverages various modern libraries for state management, API interaction, and authentication.

## Getting Started

### Step 1: 🚀 Initial Setup

- Install dependencies:

    ```bash
    npm install
    ```

### Step 2: ⚙️ Environment Configuration

- An `.env.development` file is in the root of the `frontend` directory with the following content:

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

## Important Components and Libraries

### Key Components

1. **Wallet Integration**:
    - `@rainbow-me/rainbowkit`: Provides an easy way to add wallet connection to the application.
    - `wagmi`: React hooks library for Ethereum, providing the functionality to interact with Ethereum.

2. **State Management**:
    - `@tanstack/react-query`: Handles server state management and data fetching.

3. **UI Components**:
    - `@mui/material`: A React component library that implements Google's Material Design.

4. **API Interaction**:
    - `ethers`: A library for interacting with the Ethereum blockchain and its ecosystem.

5. **Cookie Management**:
    - `react-cookie`: Allows for easy manipulation of browser cookies.

### Development Scripts

- `dev`: Starts the development server.
- `build`: Builds the application for production.
- `start`: Starts the production server.
- `lint`: Runs ESLint to analyze code for potential errors.
