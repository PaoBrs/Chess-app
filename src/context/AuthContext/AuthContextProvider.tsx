import React, { useReducer } from 'react';
import { AuthContext } from './AuthCreateContext';
import { authReducer } from './AuthReducer';

interface Props {
  children: React.ReactNode,
}

export interface AuthState {
  username: string | null
}

const initialState: AuthState = {
  username: null
}


export const AuthContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider value={{ ...state }
    }>
      {children}
    </AuthContext.Provider>
  )
}