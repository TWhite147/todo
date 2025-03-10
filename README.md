# Todo App with Authentication

This is a full-stack Todo app with authentication built using React Native, Redux, Node.js, Express, MongoDB, and JWT authentication.

## Features

- User registration and login with JWT authentication
- Todo management: Add, delete, mark as completed
- Secure storage of JWT token using `expo-secure-store`
- Frontend built with React Native and Redux
- Backend built with Express, MongoDB, and JWT
- **Database**: MongoDB
- **Authentication**: JWT tokens stored securely using `expo-secure-store`

## Technologies Used

- **Frontend**: React Native, Redux, Expo Secure Store
- **Backend**: Node.js, Express, MongoDB, JWT
- **Database**: MongoDB
- **Authentication**: JWT tokens stored securely using `expo-secure-store`

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/TWhite147/todo
cd todo-app
```

### 2. Install dependencies

From the root folder of the project:

```bash
cd server
npm install
cd ../client
npm install
```

### 3. Setup environment variables

Create a .env file in the backend (server folder) with the following variables:

```bash
MONGO_URI=<your_mongo_database_connection_uri>
JWT_SECRET=<your_secret_key_for_jwt>
```

Replace <your_mongo_database_connection_uri> and <your_secret_key_for_jwt> with appropriate values.

### 4. Run the app

To run the app, from the client and server folders run:

```bash
npm run dev
```

### 5. Usage

Frontend:
Sign up or log in to the app.
After logging in, you will be redirected to the Todo screen where you can add, delete, or mark todos as completed.
Backend:
The backend provides APIs for registration, login, and todo management.

### Contributing

Feel free to fork this repository, submit issues, and create pull requests. Contributions are always welcome!
