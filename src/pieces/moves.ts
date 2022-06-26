import { ITypePiece } from '../interfaces/interface';

export class Moves {

  pawnMoves(color: string, xFrom: number, yFrom: number, xTo: number, yTo: number, isOccupied: boolean) {
    if (!isOccupied) {
      let differenceY = yFrom - yTo === 0;

      switch (color) {
        case 'black':
          if (xFrom === 7) {
            return (xFrom - xTo === 1 || xFrom - xTo === 2) && differenceY
          }
          return xFrom - xTo === 1

        case 'white':
          if (xFrom === 1) {
            return (xTo - xFrom === 1 || xTo - xFrom === 2) && differenceY
          }
          return xTo - xFrom === 1

        default:
          return false
      }
    } else {
      switch (color) {
        case 'black':

          return xFrom - xTo === 1 && Math.abs(yFrom - yTo) === 1

        case 'white':

          return xTo - xFrom === 1 && Math.abs(yFrom - yTo) === 1

        default:
          return false
      }
    }
  }

  rookMoves() { }

  knightMoves() { }

  kingMoves() { }

  bishopMoves() { }

  queenMoves() { }



}

export class MovesFactory {

  static newMoves() {
    return new Moves();
  }
}