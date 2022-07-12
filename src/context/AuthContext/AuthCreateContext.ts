import { createContext } from 'react';

export interface AuthProps {
  user: User | null,
  game: Game | null,
  startLogin: (username: string) => Promise<void>
  startCreateGame: () => Promise<any>
}

export interface User {
  username: string;
  _id: string;
}

export interface Game {
  _id: string;
  roomCode: string;
  player1: string;
  player2: string;
  positions: any[];
  history: any[];
  result: string;
  isCompleted: boolean;
  __v: number;
}





export const AuthContext = createContext({} as AuthProps);