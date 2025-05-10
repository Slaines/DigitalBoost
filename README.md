# DigitalBoost Authentication System

This document provides instructions for setting up and using the authentication system for DigitalBoost.

## Features

- Google OAuth login
- Microsoft OAuth login
- Email/password authentication
- Protected routes
- User profile management
- Secure authentication with Firebase

## Setup Instructions

### 1. Firebase Configuration

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Authentication in the Firebase console
3. Set up the following authentication providers:
   - Email/Password
   - Google
   - Microsoft (Azure AD)
4. Get your Firebase configuration (Web API Key, Auth Domain, etc.)
5. Update the `.env` file with your Firebase configuration:

```
REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID
REACT_APP_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
```

### 2. Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Create an OAuth 2.0 Client ID
5. Add authorized JavaScript origins (e.g., `http://localhost:3000`)
6. Add authorized redirect URIs (e.g., `http://localhost:3000`)
7. Copy the Client ID and add it to your Firebase Google Auth provider

### 3. Microsoft OAuth Setup

1. Go to the [Azure Portal](https://portal.azure.com/)
2. Register a new application in Azure Active Directory
3. Set up the redirect URI to match your application (e.g., `http://localhost:3000`)
4. Get the Application (client) ID
5. Add this ID to your Firebase Microsoft Auth provider

## Usage

### Authentication Context

The application uses a React Context (`AuthContext`) to manage authentication state. You can access authentication functions and user state using the `useAuth` hook:

```jsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { currentUser, signUp, signIn, signInWithGoogle, signInWithMicrosoft, logout } = useAuth();
  
  // Use these functions to manage authentication
}
```

### Protected Routes

Protected routes ensure that only authenticated users can access certain pages. To create a protected route:

```jsx
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

### Authentication Flow

1. Users can sign up/sign in via:
   - Email and password
   - Google OAuth
   - Microsoft OAuth
2. Upon successful authentication, users are redirected to the dashboard
3. Protected routes check for authentication status and redirect to login if needed

## Security Considerations

- All authentication is handled by Firebase, which follows industry best practices
- Passwords are never stored in plaintext
- OAuth tokens are managed securely by Firebase
- Environment variables are used to store sensitive configuration
- HTTPS should be used in production

## Troubleshooting

- If OAuth login fails, check that your Firebase configuration is correct
- Ensure that the OAuth providers are properly configured in the Firebase console
- Check browser console for any errors
- Verify that your `.env` file contains the correct Firebase configuration
