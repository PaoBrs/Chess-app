import { AuthState, initialState } from './AuthContextProvider';
import { User, Game, PiecePosition } from './AuthCreateContext';

type AuthActionType =
  | { type: 'auth-login', payload: User }
  | { type: 'auth-logout' }
  | { type: 'createGame', payload: Game }
  | { type: 'updateBoard', payload: PiecePosition[] }

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

    case 'updateBoard':
      return {
        ...state,

        game: {
          ...state.game,
          positions: action.payload
        }
      }

    default:
      return state
  }
}