# Notes App with OAuth Authentication

A full-stack MERN application with Google OAuth authentication where users can create, read, update, and delete their personal notes.

## Features

- 🔐 **Google OAuth Authentication** - Secure login with Google
- 📝 **Personal Notes** - Users can only access their own notes
- 🛡️ **Protected Routes** - Authentication required for all note operations
- 📱 **Responsive Design** - Works on desktop and mobile
- ⚡ **Rate Limiting** - API protection against abuse

## Tech Stack

### Backend

- Node.js with Express
- MongoDB with Mongoose
- Passport.js for OAuth
- JWT for token-based authentication
- Express Session for session management

### Frontend

- React with Vite
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- Context API for state management

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd mern-stack-tut
```

### 2. Backend Setup

#### Install dependencies

```bash
cd backend
npm install
```

#### Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/notes-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
SESSION_SECRET=your-super-secret-session-key-change-this-in-production
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FRONTEND_URL=http://localhost:5173
```

#### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Set Application Type to "Web application"
6. Add Authorized redirect URIs:
   - `http://localhost:3000/api/auth/google/callback` (for development)
   - `https://yourdomain.com/api/auth/google/callback` (for production)
7. Copy the Client ID and Client Secret to your `.env` file

#### Start the backend server

```bash
npm run dev
```

### 3. Frontend Setup

#### Install dependencies

```bash
cd frontend
npm install
```

#### Start the frontend development server

```bash
npm run dev
```

### 4. Database Setup

Make sure MongoDB is running on your system. The app will automatically create the database and collections when you first use it.

## Usage

1. **Login**: Visit `http://localhost:5173/login` and click "Sign in with Google"
2. **Create Notes**: After login, you'll be redirected to the home page where you can create new notes
3. **Manage Notes**: View, edit, and delete your personal notes
4. **Logout**: Click the logout button in the navbar

## API Endpoints

### Authentication

- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - OAuth callback
- `GET /api/auth/me` - Get current user info
- `GET /api/auth/logout` - Logout

### Notes (Protected - requires authentication)

- `GET /api/notes` - Get all notes for current user
- `GET /api/notes/:id` - Get specific note (if owned by user)
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note (if owned by user)
- `DELETE /api/notes/:id` - Delete note (if owned by user)

## Security Features

- **JWT Tokens**: Secure token-based authentication
- **User Isolation**: Users can only access their own notes
- **Rate Limiting**: API protection against abuse
- **Session Management**: Secure session handling
- **CORS Protection**: Configured for development and production

## Production Deployment

### Environment Variables

Update your `.env` file for production:

```env
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
```

### Build Frontend

```bash
cd frontend
npm run build
```

### Deploy Backend

The backend will serve the frontend build files in production mode.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
