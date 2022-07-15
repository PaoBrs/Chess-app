import React, { useReducer } from 'react';
import { AuthContext, User, Game } from './AuthCreateContext';
import { authReducer } from './AuthReducer';
import { createOrLoginUser, createGame, getCreatedGame } from '../../services/chessboardServices';

interface Props {
  children: React.ReactNode,
}

export interface AuthState {
  user: User | null
  game: Game | null
}

export const initialState: AuthState = {
  user: null,
  game: null
}


export const AuthContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const startLogin = async (username: string) => {
    const user = await createOrLoginUser(username)
    localStorage.setItem('user', JSON.stringify(user))

    dispatch({ type: 'auth-login', payload: user })
  }

  const startCreateGame = async () => {
    const game = await createGame(state.user!.username);
    localStorage.setItem('game', JSON.stringify(game))

    dispatch({ type: 'createGame', payload: game })
  }

  const startGettingGame = async (roomCode: string | number, player2: string) => {
    const game = await getCreatedGame(roomCode, player2);
    console.log(game)
    localStorage.setItem('game', JSON.stringify(game))

    dispatch({ type: 'createGame', payload: game })
  }

  //missing: enter a room by roomcode
  //missing: change active game in useReducer

  return (
    <AuthContext.Provider value={
      {
        ...state,
        startLogin,
        startCreateGame,
        startGettingGame,
      }
    }>
      {children}
    </AuthContext.Provider>
  )
}