import { ITypePiece, LettersAxis, PGNCode } from "../interfaces/interface";

const pgnToName: any = {
  r: 'rook',
  b: 'bishop',
  q: 'queen',
  k: 'king',
  n: 'knight'
}

export class Piece {

  color: 'white' | 'black';
  img: string;
  type: ITypePiece;
  hasMoved: boolean;

  constructor(color: 'white' | 'black', img: string, type: ITypePiece) {
    this.color = color;
    this.img = img;
    this.type = type;
    this.hasMoved = false;

  }

  getColor() {
    return this.color
  }

}

export class PieceFactory {

  static newPiece(color: 'white' | 'black', type: ITypePiece) {
    const image = (color === "white" ? `${type}_w.png` : `${type}_b.png`)
    return new Piece(color, image, type)
  }

  static newPiecePGN(type: PGNCode, x: number, y: LettersAxis) {
    let image;
    if (type === '') {
      image = (x < 2 ? 'pawn_w.png' : 'pawn_b.png')
    } else {
      image = (x < 2 ? `${pgnToName[type]}_w.png` : `${pgnToName[type]}_b.png`)
    }

    const color = (x < 2 ? 'white' : 'black')
    if (type !== '') {
      return new Piece(color, image, pgnToName[type])
    }
    return new Piece(color, image, 'pawn')
  }


  // static moveTo(board: (Piece | null)[], from: number, to: number, setBoard: (board: (Piece | null)[]) => void) {
  //   const piece = board[from];
  //   board[from] = null;
  //   board[to] = piece;
  //   setBoard([...board])
  // }


}