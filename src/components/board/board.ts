import { Tile, TileFactory } from './tile';
import { PieceFactory, Piece } from '../../pieces/piece';

type LettersAxis = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'

export class Board {
  public chessBoard: Tile[][];


  constructor() {
    this.chessBoard = this.setInitialPositions()
    console.log(this.getTilePGN(7, 'd'))
    console.log(this.getTileCartesian(0, 0));
  }


  public setInitialPositions() {
    const squares = Array(8).fill(null)

    for (let i = 0; i < squares.length; i++) {
      squares[i] = Array(8).fill(null)
    }
    console.log(squares)
    squares[0][0] = TileFactory.newTile(0, 0, PieceFactory.newPiece('white', 'rook'));
    squares[0][1] = TileFactory.newTile(0, 1, PieceFactory.newPiece('white', 'knight'));
    squares[0][2] = TileFactory.newTile(0, 2, PieceFactory.newPiece('white', 'bishop'));
    squares[0][3] = TileFactory.newTile(0, 3, PieceFactory.newPiece('white', 'queen'));
    squares[0][4] = TileFactory.newTile(0, 4, PieceFactory.newPiece('white', 'king'));
    squares[0][5] = TileFactory.newTile(0, 2, PieceFactory.newPiece('white', 'bishop'));
    squares[0][6] = TileFactory.newTile(0, 1, PieceFactory.newPiece('white', 'knight'));
    squares[0][7] = TileFactory.newTile(0, 0, PieceFactory.newPiece('white', 'rook'));

    for (let i = 0; i < 8; i++) {
      squares[1][i] = TileFactory.newTile(1, 0, PieceFactory.newPiece('white', 'pawn'));
    }

    squares[7][0] = TileFactory.newTile(7, 0, PieceFactory.newPiece('black', 'rook'));
    squares[7][1] = TileFactory.newTile(7, 1, PieceFactory.newPiece('black', 'king'));
    squares[7][2] = TileFactory.newTile(7, 2, PieceFactory.newPiece('black', 'bishop'));
    squares[7][3] = TileFactory.newTile(7, 3, PieceFactory.newPiece('black', 'queen'));
    squares[7][4] = TileFactory.newTile(7, 4, PieceFactory.newPiece('black', 'king'));
    squares[7][5] = TileFactory.newTile(7, 5, PieceFactory.newPiece('black', 'bishop'));
    squares[7][6] = TileFactory.newTile(7, 6, PieceFactory.newPiece('black', 'king'));
    squares[7][7] = TileFactory.newTile(7, 7, PieceFactory.newPiece('black', 'rook'));

    for (let i = 0; i < 8; i++) {
      squares[6][i] = TileFactory.newTile(1, 0, PieceFactory.newPiece('black', 'pawn'));
    }

    for (let i = 2; i < 6; i++) {
      for (let j = 0; j < 8; j++) {
        squares[i][j] = TileFactory.newTile(i, j, null);
      }
    }
    return squares as Tile[][];
  }

  public getTileCartesian(x: number, y: number) {
    if (x < 0 || x > 7 || y < 0 || y > 7) {
      throw new Error("Invalid coordinates");
    }

    return this.chessBoard[x][y];

  }

  public getTilePGN(x: number, y: LettersAxis): Tile {
    const dictionary = {
      a: 0,
      b: 1,
      c: 2,
      d: 3,
      e: 4,
      f: 5,
      g: 6,
      h: 7
    }

    if (x < 0 || x > 7 || dictionary[y] < 0 || dictionary[y] > 7) {
      throw new Error("Invalid coordinates");
    }

    return this.chessBoard[x][dictionary[y]];
  }
}

export class BoardFactory {

  static newBoard() {
    return new Board();
  }
}