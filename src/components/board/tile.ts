import { Piece, PieceFactory } from '../../pieces/piece';
import { PGNCode, LettersAxis, ITypePiece } from '../../interfaces/interface';
import { letterToNumber } from '../../utils/letterToNumber';

export class Tile {
  constructor(
    public x: number,
    public y: number,
    public piece: Piece | null,
  ) { }

  isOccupied() {
    return this.piece ? true : false;
  }
}

export class TileFactory {
  static newTile(x: number, y: number, piece: Piece | null): Tile {
    return new Tile(x, y, piece)
  }

  static newTilePGN(type: PGNCode, x: number, y: LettersAxis) {

    const piece = PieceFactory.newPiecePGN(type, x, y)
    return new Tile(x, letterToNumber[y], piece)
  }

  static newTileWithPieceCoords(x: number, y: number, color: 'white' | 'black', type: ITypePiece) {
    const piece = PieceFactory.newPieceByTypeAndColor(color, type)
    return new Tile(x, y, piece)
  }
}