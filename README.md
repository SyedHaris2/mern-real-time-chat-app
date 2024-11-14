
# MERN Real-Time Chat Application

A real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO for instant messaging. This project supports real-time user-to-user messaging with authentication and an intuitive user interface.

![image](https://github.com/user-attachments/assets/7f25da31-0b68-4e06-8c12-56492c2b62e1)

## Features
- User Authentication (JWT and bcrypt.js)
- Real-Time Messaging with Socket.IO
- iPhone Default Message Tune on Message Receipt
- User Notifications and Online Status
- Easy Navigation with React Router
- Styled Components with Tailwind CSS and DaisyUI


## Technologies Used
- **Frontend**: React, Tailwind CSS, DaisyUI, Zustand for state management
- **Backend**: Node.js, Express, MongoDB, Socket.IO
- **Authentication**: JWT for token-based authentication, bcrypt.js for password encryption

## Getting Started

### Prerequisites
- React
- Node.js
- MongoDB
- Git

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SyedHaris2/mern-real-time-chat-app.git
   cd mern-real-time-chat-app
   ```

2. **Install dependencies for both frontend and backend**:
   - For the backend:
     ```bash
     cd backend
     npm install
     ```
   - For the frontend:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Environment Variables**:
   - Create a `.env` file in both the `frontend` and `backend` folders with the necessary environment variables. Example for backend:
     ```plaintext
     MONGO_URI=your_mongo_database_url
     JWT_SECRET=your_jwt_secret
     ```

4. **Start the Application**:
   - In the backend directory:
     ```bash
     npm run server
     ```
   - In the frontend directory:
     ```bash
     npm run dev
     ```

5. **Access the Application**:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:4000`

## Usage
- Register a new account or log in with an existing one.
- Start a real-time chat with other users online.
- Receive notifications when messages are sent and read.

## Folder Structure
```plaintext
mern-real-time-chat-app/
├── backend/
│   ├── config/           # Environment configuration
│   ├── controllers/      # Logic for routes
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── socket/           # Socket.IO setup
│   └── server.js         # Main server file
├── frontend/
│   ├── public/           # Public assets
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── context/      # Context API for state
│   │   └── App.jsx       # Main React file
└── README.md             # Project documentation
```

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing
Feel free to submit issues or pull requests to help improve this project!
