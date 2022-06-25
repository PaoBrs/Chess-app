import { ITypePiece, LettersAxis, PGNCode } from "../interfaces/interface";
import { Moves } from './moves';

const pgnToName: any = {
  r: 'rook',
  b: 'bishop',
  q: 'queen',
  k: 'king',
  n: 'knight'
}

export class Piece {

  color: string;
  img: string;
  type: ITypePiece;

  constructor(color: string, img: string, type: ITypePiece) {
    this.color = color;
    this.img = img;
    this.type = type;

  }

  getColor() {
    return this.color
  }

}

export class PieceFactory {

  static newPiece(color: string, type: ITypePiece) {
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