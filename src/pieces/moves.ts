import { ITypePiece } from '../interfaces/interface';

export class Moves {

  pawnMoves() {
    const white = [48, 50, 51, 52, 53, 54, 55]
    const black = [8, 9, 10, 11, 12, 13, 14, 15]
  }

  rookMoves() { }

  knightMoves() { }

  kingMoves() { }

  bishopMoves() { }



}

export class MovesFactory {

  static newMoves() {
    return new Moves();
  }
}