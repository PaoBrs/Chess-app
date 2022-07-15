import { createContext } from 'react';
import { ITypePiece } from '../../interfaces/interface';

export interface AuthProps {
  user: User | null,
  game: Game | null,
  startLogin: (username: string) => Promise<void>
  startCreateGame: () => Promise<any>
  startGettingGame: (roomCode: string | number, player2: string) => Promise<any>
  setLoggedUser: (user: User) => void
  setCurrentGame: (game: Game) => void
  startLogout: () => void
}

export interface User {
  username: string;
  _id: string;
}


export interface Game {
  roomCode: string;
  player1: string;
  player2: string;
  positions: PiecePosition[];
  history: any[];
  result: string;
  isCompleted: boolean;
  _id: string;
  __v: number;
}

export interface PiecePosition {
  x: number;
  y: number;
  color: 'white' | 'black';
  type: ITypePiece;
}

export enum Color {
  Black = "black",
  White = "white",
}






export const AuthContext = createContext({} as AuthProps);