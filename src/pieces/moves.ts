import { RookMovesProps, PawnMovesProps } from './interfaces';


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
          return xFrom - xTo === 1 && Math.abs(yFrom - yTo) === 1

        case 'white':

          return xTo - xFrom === 1 && Math.abs(yFrom - yTo) === 1

        default:
          return false
      }
    }
  }

  rookMoves({ xFrom, yFrom, xTo, yTo, chessBoard }: RookMovesProps) {
    const isSameRow: boolean = (xFrom === xTo);
    const isSameColumn: boolean = (yFrom === yTo);
    let isPathFree = true;

    if (isSameRow) {
      if (yTo > yFrom) {
        console.log(1)
        for (let i = yFrom + 1; i < yTo; i++) {
          if (chessBoard[xFrom][i].isOccupied()) {
            isPathFree = false
          }
        }
        return isPathFree ? true : false
      } else {
        for (let i = yTo + 1; i < yFrom; i++) {
          if (chessBoard[xFrom][i].isOccupied()) {
            isPathFree = false
          }
        }
        return isPathFree ? true : false
      }
    }
    if (isSameColumn) {
      if (xTo > xFrom) {
        for (let i = xFrom + 1; i < xTo; i++) {
          if (chessBoard[i][yFrom].isOccupied()) {
            isPathFree = false
          }
        }
        return isPathFree ? true : false
      } else {
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


  knightMoves({ xFrom, yFrom, xTo, yTo }: RookMovesProps) {
    const xDifference = Math.abs(xFrom - xTo);
    const yDifference = Math.abs(yFrom - yTo);

    return (xDifference * yDifference === 2) ? true : false
  }

  bishopMoves({ xFrom, yFrom, xTo, yTo, chessBoard }: RookMovesProps) {
    const isSameDiagonal = (Math.abs(xFrom - xTo) === Math.abs(yFrom - yTo))
    let isPathFree = true;

    if (!isSameDiagonal) {
      return false
    }

    if (xFrom < xTo && yFrom < yTo) {
      let j = yFrom + 1
      for (let i = xFrom + 1; i < xTo; i++) {
        if (chessBoard[i][j].isOccupied()) {
          isPathFree = false;
        }
        j++;
      }
    } else if (xFrom > xTo && yFrom < yTo) {
      let j = yTo - 1
      for (let i = xTo + 1; i < xFrom; i++) {
        if (chessBoard[i][j].isOccupied()) {
          isPathFree = false;
        }
        j--;
      }
    } else if (xTo > xFrom && yTo < yFrom) {
      let j = yTo + 1;
      for (let i = xFrom + 1; i < xTo; i++) {
        if (chessBoard[i][j].isOccupied()) {
          isPathFree = false;
        }
        j++;
      }
    } else if (xFrom > xTo && yFrom > yTo) {
      let j = yTo + 1;
      for (let i = xTo + 1; i < xFrom; i++) {
        if (chessBoard[i][j].isOccupied()) {
          isPathFree = false;
        }
        j++;
      }
    }

    return isPathFree
  }

  kingMoves() {

  }


  queenMoves() { }



}


export class MovesFactory {

  static newMoves() {
    return new Moves();
  }
}