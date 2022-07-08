import { AuthState } from "./AuthContextProvider"

type AuthActionType =
  | { type: 'auth-login', payload: string }
  | { type: 'auth-logout' }

export const authReducer = (state: AuthState, action: AuthActionType) => {
  switch (action.type) {
    case 'auth-login':
      return {
        ...state,
        username: action.payload
      }

    case 'auth-logout':
      return {
        username: null
      }

    default:
      return state
  }
}