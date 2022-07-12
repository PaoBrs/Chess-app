import { AuthState, initialState } from './AuthContextProvider';
import { User, Game } from './AuthCreateContext';

type AuthActionType =
  | { type: 'auth-login', payload: User }
  | { type: 'auth-logout' }
  | { type: 'createGame', payload: Game }

export const authReducer = (state: AuthState, action: AuthActionType) => {
  switch (action.type) {
    case 'auth-login':
      return {
        ...state,
        user: action.payload
      }

    case 'auth-logout':
      return initialState

    case 'createGame':
      return {
        ...state,
        game: action.payload
      }

    default:
      return state
  }
}