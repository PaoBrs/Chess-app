import { PiecePosition } from '../context/AuthContext/AuthCreateContext';

export interface ServerToClientEvents {
  movePieceBack: (xFrom: number, yFrom: number, xTo: number, yTo: number) => void;
  boardChangedBack: (board: PiecePosition[], turn: 'white' | 'black') => void;
  savedBoard: (board: PiecePosition[], turn: 'white' | 'black') => void;
}

export interface ClientToServerEvents {
  movePiece: (xFrom: number, yFrom: number, xTo: number, yTo: number) => void;
  boardChange: (board: PiecePosition[], roomCode: string, turn: 'white' | 'black') => void;
  requestBoard: (getBoard: string, roomCode: string) => void;
}