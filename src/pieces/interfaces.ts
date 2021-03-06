import { Tile } from '../components/board/tile';


export interface PawnMovesProps extends BasicMove {
  colorFrom: string,
  colorTo: string | undefined,
  isOccupied: boolean,
  chessBoard: Tile[][],
  isChecking?: boolean,
}

export interface RookMovesProps extends BasicMove {
  chessBoard: Tile[][],
}

export interface BasicMove {
  xFrom: number,
  yFrom: number,
  xTo: number,
  yTo: number,
}

export interface KingMovesProps extends BasicMove {
  chessBoard: Tile[][],
  isChecking?: boolean,
}