import { isSameDiagonal } from '../validSpots/validDiagonals';
import { Piece } from './piece';

export class Pawn extends Piece{

  constructor (color){
    super(color, (color === "white" ? 'pawn_w.png' : 'pawn_b.png'), 'pawn') //verify

    this.startingPositions={
      white: [48, 50, 51, 52, 53, 54, 55],
      black:[8, 9, 10, 11, 12, 13, 14, 15]
    }
  }
  
  isMoveValid(from, to, isToOccupied){
    if (this.color === "white"){
      if(to===from-8 && !isToOccupied){
        return true
      }
      if(to===from-16 && !isToOccupied && this.startingPositions.white.indexOf( from ) !== -1){
        return true
      }
      if(to===from-9 && isToOccupied && isSameDiagonal(from, to)){
        return true
      }
      if(to===from-7 && isToOccupied && isSameDiagonal(from, to)){
        return true
      }
    } else {
      if(to===from+8 && !isToOccupied){
        return true
      }
      if(to===from+16 && !isToOccupied && this.startingPositions.black.indexOf( from ) !== -1){
        return true
      }
      if(to===from+9 && isToOccupied && isSameDiagonal(from, to)){
        return true
      }
      if(to===from+7 && isToOccupied && isSameDiagonal(from, to)){
        return true
      }
    }
    return false
  }
}

export class PawnFactory{
  static newPawn (color){
    return new Pawn(color)
  }
}