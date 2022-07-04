export interface ServerToClientEvents {
  movePieceBack: (xFrom: number, yFrom: number, xTo: number, yTo: number) => void;
}

export interface ClientToServerEvents {
  movePiece: (xFrom: number, yFrom: number, xTo: number, yTo: number) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}