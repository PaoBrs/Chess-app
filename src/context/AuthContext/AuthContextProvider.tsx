import React, { useReducer } from 'react';
import { AuthContext, User, Game, PiecePosition } from './AuthCreateContext';
import { authReducer } from './AuthReducer';
import { createOrLoginUser, createGame, getCreatedGame } from '../../services/chessboardServices';

interface Props {
  children: React.ReactNode,
}

export interface AuthState {
  user: User | null
  game: Game | any
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

  const startLogout = () => {
    localStorage.clear()
    dispatch({ type: 'auth-logout' })
  }

  const setLoggedUser = (user: User) => {
    dispatch({ type: 'auth-login', payload: user })
  }

  const startCreateGame = async () => {
    const game = await createGame(state.user!.username);
    localStorage.setItem('game', JSON.stringify(game))
    localStorage.setItem('turn', 'white')

    dispatch({ type: 'createGame', payload: game })
  }

  const setCurrentGame = (game: Game) => {
    dispatch({ type: 'createGame', payload: game })
  }

  const startGettingGame = async (roomCode: string | number, player2: string) => {
    const game = await getCreatedGame(roomCode, player2);
    console.log(game)
    localStorage.setItem('game', JSON.stringify(game))

    dispatch({ type: 'createGame', payload: game })
  }

  const updatingBoardPositions = (positions: PiecePosition[]) => {
    dispatch({ type: 'updateBoard', payload: positions })

  }

  //missing: change active game in useReducer

  return (
    <AuthContext.Provider value={
      {
        ...state,
        startLogin,
        startCreateGame,
        startGettingGame,
        setLoggedUser,
        setCurrentGame,
        startLogout,
        updatingBoardPositions,
      }
    }>
      {children}
    </AuthContext.Provider>
  )
}