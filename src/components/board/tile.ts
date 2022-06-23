import { Piece } from '../../pieces/piece';

export class Tile {
  constructor(
    public x: number,
    public y: number,
    public piece: Piece | null,
  ) { }
}

export class TileFactory {
  static newTile(x: number, y: number, piece: Piece | null): Tile {
    return new Tile(x, y, piece)
  }
}