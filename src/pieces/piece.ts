type ITypePiece = 'pawn' | 'rook' | 'bishop' | 'queen' | 'king' | 'knight';


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

  static moveTo(board: (Piece | null)[], from: number, to: number, setBoard: (board: (Piece | null)[]) => void) {
    const piece = board[from];
    board[from] = null;
    board[to] = piece;
    setBoard([...board])
  }

}