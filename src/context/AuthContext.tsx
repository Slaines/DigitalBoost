import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/config';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<any>;
  signInWithApple: () => Promise<any>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Development mode flag - set to true to bypass authentication
const DEV_MODE = true;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // In dev mode, create a mock user
  const mockUser = DEV_MODE ? {
    uid: 'dev-user-123',
    email: 'dev@example.com',
    displayName: 'Development User',
    phoneNumber: '+1234567890',
    emailVerified: true,
    // Add other required User properties with dummy values
    getIdToken: () => Promise.resolve('mock-token'),
    toJSON: () => ({})
  } as User : null;

  const [currentUser, setCurrentUser] = useState<User | null>(mockUser);
  const [loading, setLoading] = useState<boolean>(!DEV_MODE);
  const [error, setError] = useState<string | null>(null);

  // Clear any error messages
  const clearError = () => {
    setError(null);
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      setLoading(true);
      clearError();
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile with name
      if (result.user) {
        await updateProfile(result.user, {
          displayName: `${firstName} ${lastName}`
        });
      }
    } catch (err: any) {
      let errorMessage = 'Failed to create an account';
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'Email is already in use';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak';
      }
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      clearError();
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      let errorMessage = 'Failed to sign in';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Try again later';
      }
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      clearError();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (err: any) {
      setError('Failed to sign in with Google');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Apple
  const signInWithApple = async () => {
    try {
      setLoading(true);
      clearError();
      const provider = new OAuthProvider('apple.com');
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (err: any) {
      setError('Failed to sign in with Apple');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Log out
  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
    } catch (err: any) {
      setError('Failed to log out');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      clearError();
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      let errorMessage = 'Failed to reset password';
      if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format';
      }
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Subscribe to auth state changes (only if not in dev mode)
  useEffect(() => {
    if (DEV_MODE) {
      // In dev mode, we're already set up with a mock user
      return () => {};
    }
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    error,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithApple,
    logout,
    resetPassword,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
