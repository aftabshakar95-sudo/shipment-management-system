# Logistics Management System

A full-stack logistics management web application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- 📦 Create and manage shipments
- 🔍 Track shipments by tracking number
- 📊 Dashboard with statistics
- 🚚 Update shipment status (Pending, In-Transit, Delivered, Cancelled)
- 👥 User management with authentication
- 📱 Responsive design

## Tech Stack

**Frontend:**
- React 18
- React Router DOM
- Axios
- CSS3

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)

### Backend Setup

1. Install backend dependencies:
```bash
npm install
```

2. Configure environment variables:
Edit `.env` file and update MongoDB URI and JWT secret:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/logistics
JWT_SECRET=your_jwt_secret_key_here
```

3. Start the backend server:
```bash
npm run server
```

### Frontend Setup

1. Navigate to client directory and install dependencies:
```bash
cd client
npm install
```

2. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000` and backend on `http://localhost:5000`.

### Run Both (Backend + Frontend)

From the root directory:
```bash
npm run dev
```

## API Endpoints

### Shipments
- `GET /api/shipments` - Get all shipments
- `GET /api/shipments/track/:trackingNumber` - Track shipment
- `POST /api/shipments` - Create new shipment
- `PATCH /api/shipments/:id` - Update shipment status
- `DELETE /api/shipments/:id` - Delete shipment

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user

### Authentication
- `POST /api/auth/login` - User login

## Usage

1. Start MongoDB server
2. Run the backend server
3. Run the frontend development server
4. Open browser and navigate to `http://localhost:3000`
5. Create shipments, track them, and manage logistics operations

## Project Structure

```
logistics-management/
├── models/           # Mongoose models
├── routes/           # Express routes
├── client/           # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── App.js
│       └── index.js
├── server.js         # Express server
├── .env             # Environment variables
└── package.json
```

## License

MIT
