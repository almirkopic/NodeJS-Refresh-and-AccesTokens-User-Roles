# Web Application with Authentication

A modern web application built with React and Node.js, featuring secure authentication and role-based access control.

## Features

- 🔐 Secure authentication system
- 🔄 Token-based authentication with refresh mechanism
- 👥 Role-based access control
- 🌐 API integration with axios
- 🔒 Protected routes
- ⚡ Modern React with Context API

## Tech Stack

- **Frontend:**

  - React
  - Vite
  - Axios
  - Context API for state management

- **Backend:**
  - Node.js
  - Express.js
  - JWT Authentication

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

## Installation

1. Clone the repository:

```bash
git clone [your-repository-url]
cd [your-project-name]
```

2. Install dependencies for both frontend and backend:

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:3000
```

Create a `.env` file in the backend directory:

```env
PORT=3000
JWT_SECRET=your_jwt_secret
```

## Running the Application

1. Start the backend server:

```bash
cd backend
npm start
```

2. Start the frontend development server:

```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
