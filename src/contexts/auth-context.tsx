'use client';

import { useMutation } from '@apollo/client';
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from 'react';

import { FORWARD_PASSWORD, SIGN_IN, SIGN_UP } from '@/lib/queries';
import type {
  AuthContextType,
  AuthState,
  ForwardPasswordResponse,
  SignInInput,
  SignInResponse,
  SignUpInput,
  SignUpResponse,
  User,
} from '@/lib/types';

const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'auth_user',
};

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_ERROR' }
  | { type: 'SIGN_OUT' }
  | { type: 'LOAD_FROM_STORAGE'; payload: { user: User; token: string } };

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const [signInMutation] = useMutation<SignInResponse>(SIGN_IN);
  const [signUpMutation] = useMutation<SignUpResponse>(SIGN_UP);
  const [forwardPasswordMutation] =
    useMutation<ForwardPasswordResponse>(FORWARD_PASSWORD);

  // Load auth data from localStorage on mount
  useEffect(() => {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      const userString = localStorage.getItem(STORAGE_KEYS.USER);

      if (token && userString) {
        const user = JSON.parse(userString);
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: { user, token } });
      }
    } catch (error) {
      console.error('Error loading auth data from storage:', error);
    }
  }, []);

  // Save auth data to localStorage
  const saveToStorage = (user: User, token: string) => {
    try {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving auth data to storage:', error);
    }
  };

  // Clear auth data from localStorage
  const clearStorage = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
    } catch (error) {
      console.error('Error clearing auth data from storage:', error);
    }
  };

  const signIn = async (input: SignInInput) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const { data } = await signInMutation({ variables: input });

      if (data?.signIn?.token) {
        // Extract user info from token or create basic user object
        // For now, we'll create a basic user object with the identifier
        const user: User = {
          email: input.identifier,
          username: input.identifier.split('@')[0], // Simple username extraction
        };

        saveToStorage(user, data.signIn.token);
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user, token: data.signIn.token },
        });
      } else {
        throw new Error('Invalid response');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      dispatch({ type: 'AUTH_ERROR' });
      throw error;
    }
  };

  const signUp = async (input: SignUpInput) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const { data } = await signUpMutation({ variables: { input } });

      if (data?.signUp) {
        // After signup, user needs to sign in
        dispatch({ type: 'AUTH_ERROR' });
        // You could automatically sign them in here if you want
        // await signIn({ identifier: input.email, password: input.password });
      } else {
        throw new Error('Invalid response');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      dispatch({ type: 'AUTH_ERROR' });
      throw error;
    }
  };

  const signOut = () => {
    clearStorage();
    dispatch({ type: 'SIGN_OUT' });
  };

  const forwardPassword = async (email: string) => {
    try {
      await forwardPasswordMutation({ variables: { email } });
    } catch (error) {
      console.error('Forward password error:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    ...state,
    signIn,
    signUp,
    signOut,
    forwardPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
