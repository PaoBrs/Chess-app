import { PiecePosition } from '../context/AuthContext/AuthCreateContext';

export interface ServerToClientEvents {
  movePieceBack: (xFrom: number, yFrom: number, xTo: number, yTo: number) => void;
  boardChangedBack: (board: PiecePosition[]) => void;
  savedBoard: (board: PiecePosition[]) => void;
}

export interface ClientToServerEvents {
  movePiece: (xFrom: number, yFrom: number, xTo: number, yTo: number) => void;
  boardChange: (board: PiecePosition[], roomCode: string) => void;
  requestBoard: (getBoard: string, roomCode: string) => void;
}