# Game Management System

A full-stack application for managing a collection of games. The application includes a RESTful API backend built with Node.js, Express, and MongoDB, and a responsive frontend built with React, TypeScript, and shadcn/ui components.

## Features

- Complete CRUD functionality for game records
- RESTful API with proper error handling
- Responsive UI with modern design using Tailwind CSS
- Form validation using React Hook Form and Zod
- Toast notifications for user feedback
- TypeScript for type safety across the entire application

## Tech Stack

### Backend

- Node.js
- Express
- TypeScript
- MongoDB Atlas
- Mongoose
- Swagger UI for API documentation

### Frontend

- React
- TypeScript
- React Router for navigation
- React Hook Form for form handling
- Zod for validation
- Tailwind CSS for styling
- shadcn/ui components
- Axios for API requests

## Project Structure

```
game-management-system/
├── backend/               # Backend API server
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # Request handlers
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── middlewares/   # Custom middlewares
│   │   ├── utils/         # Utility functions
│   │   └── app.ts         # Express app setup
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/              # React frontend application
    ├── public/            # Static files
    ├── src/
    │   ├── components/    # React components
    │   │   ├── games/     # Game-related components
    │   │   ├── layout/    # Layout components
    │   │   └── ui/        # UI components (shadcn)
    │   ├── lib/           # Utility libraries
    │   ├── pages/         # Page components
    │   ├── services/      # API and service functions
    │   ├── types/         # TypeScript type definitions
    │   ├── App.tsx        # Main App component
    │   └── index.tsx      # Entry point
    ├── package.json
    └── tsconfig.json
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account

### Backend Setup

1. Create a MongoDB Atlas account if you don't have one

   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
   - Follow the registration process
   - Create a new project
   - Create a free cluster
   - Set up database access (create a database user)
   - Set up network access (allow access from anywhere for development)

2. Clone this repository

   ```bash
   git clone https://github.com/yourusername/game-management-system.git
   cd game-management-system
   ```

3. Set up the backend

   ```bash
   cd backend
   npm install
   ```

4. Create a `.env` file in the backend directory

   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/gamedb?retryWrites=true&w=majority
   NODE_ENV=development
   ```

   Replace `<username>`, `<password>`, and `<cluster>` with your MongoDB Atlas credentials.

5. Start the backend development server
   ```bash
   npm run dev
   ```
   The server should start on http://localhost:5000

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory

   ```bash
   cd ../frontend
   npm install
   ```

2. Create a `.env` file in the frontend directory

   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. Start the frontend development server
   ```bash
   npm start
   ```
   The application should open in your browser at http://localhost:3000

## API Documentation

Once the backend server is running, you can access the Swagger API documentation at:

```
http://localhost:5000/api-docs
```

This provides interactive documentation for all available endpoints.

## API Endpoints

- `GET /api/games` - Get all games
- `GET /api/games/:id` - Get a single game by ID
- `POST /api/games` - Create a new game
- `PUT /api/games/:id` - Update a game by ID
- `DELETE /api/games/:id` - Delete a game by ID

## Deployment

### Backend Deployment

1. You can deploy the backend to platforms like Heroku, Render, or Vercel.
2. Set the environment variables in your deployment platform:
   - `PORT`
   - `MONGODB_URI`
   - `NODE_ENV=production`

### Frontend Deployment

1. Build the frontend for production

   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the contents of the `build` directory to platforms like Netlify, Vercel, or GitHub Pages.
3. Make sure to update the `VITE_API_URL` environment variable to point to your deployed backend API.

## Code Structure and Best Practices

This project follows several best practices:

- **Separation of Concerns**: Backend and frontend are clearly separated.
- **MVC Pattern**: The backend follows the Model-View-Controller pattern.
- **Type Safety**: TypeScript is used throughout the application.
- **Data Validation**: Both frontend and backend validate data.
- **Responsive Design**: The UI is responsive and works on mobile and desktop.
- **Error Handling**: Comprehensive error handling on both frontend and backend.
- **User Feedback**: Toast notifications provide feedback for user actions.


