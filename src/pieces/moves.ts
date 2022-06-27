import { ITypePiece } from '../interfaces/interface';
import { Tile } from '../components/board/tile';

interface PawnMovesProps {
  colorFrom: string,
  colorTo: string | undefined,
  xFrom: number,
  yFrom: number,
  xTo: number,
  yTo: number,
  isOccupied: boolean,
  chessBoard: Tile[][],
}

interface RookMovesProps {
  xFrom: number,
  yFrom: number,
  xTo: number,
  yTo: number,
  chessBoard: Tile[][],
  colorTo: string | undefined
}

export class Moves {

  pawnMoves({ colorFrom, colorTo, xFrom, yFrom, xTo, yTo, isOccupied, chessBoard }: PawnMovesProps) {
    if (!isOccupied) {
      let isSameColumn = yFrom - yTo === 0;

      switch (colorFrom) {
        case 'black':
          if (xFrom === 6) {
            if (xFrom - xTo === 1 && isSameColumn) {
              return true
            } else if (xFrom - xTo === 2 && isSameColumn) {
              return !chessBoard[xFrom - 1][yFrom].isOccupied()
            }

          }
          return xFrom - xTo === 1

        case 'white':
          if (xFrom === 1) {
            if (xTo - xFrom === 1 && isSameColumn) {
              return true
            } else if (xTo - xFrom === 2 && isSameColumn) {
              return !chessBoard[xFrom + 1][yFrom].isOccupied()
            }
          }
          return xTo - xFrom === 1

        default:
          return false
      }
    } else {
      switch (colorFrom) {
        case 'black':
          if (colorTo === 'white') {
            return xFrom - xTo === 1 && Math.abs(yFrom - yTo) === 1
          }
          return false

        case 'white':
          if (colorTo === 'black') {
            return xTo - xFrom === 1 && Math.abs(yFrom - yTo) === 1
          }
          return false

        default:
          return false
      }
    }
  }

  rookMoves({ xFrom, yFrom, xTo, yTo, chessBoard }: RookMovesProps) {
    const isSameRow: boolean = (xFrom === xTo);
    const isSameColumn: boolean = (yFrom === yTo);
    let isPathFree = true
    const colorFrom = chessBoard[xFrom][yFrom].piece!.color
    const colorTo = chessBoard[xTo][yTo].piece?.color

    if (colorFrom === colorTo) {
      return false
    }

    if (isSameRow) {
      console.log(0)
      if (yTo > yFrom) {
        console.log(1)
        for (let i = yFrom + 1; i < yTo; i++) {
          if (chessBoard[xFrom][i].isOccupied()) {
            isPathFree = false
          }
        }
        return isPathFree ? true : false
      } else {
        console.log(2)
        for (let i = yTo + 1; i < yFrom; i++) {
          if (chessBoard[xFrom][i].isOccupied()) {
            isPathFree = false
          }
        }
        return isPathFree ? true : false
      }
    }
    if (isSameColumn) {
      console.log(3)
      if (xTo > xFrom) {
        console.log(3.1)
        for (let i = xFrom + 1; i < xTo; i++) {
          if (chessBoard[i][yFrom].isOccupied()) {
            isPathFree = false
          }
        }
        return isPathFree ? true : false
      } else {
        console.log(4)
        for (let i = xTo + 1; i < xFrom; i++) {
          if (chessBoard[i][yFrom].isOccupied()) {
            isPathFree = false
          }
        }
        return isPathFree ? true : false
      }
    }
    return false
  }


  knightMoves() { }

  kingMoves() {

  }

  bishopMoves() { }

  queenMoves() { }



}


export class MovesFactory {

  static newMoves() {
    return new Moves();
  }
}