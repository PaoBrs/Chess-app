/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Spot from '../tile/Spot';
import './Chessboard.css'
import { BoardFactory } from '../board/board';
import { Tile } from '../board/tile';
import { numberToLetter } from '../../utils/numberToLetter';

const horizontalLines = [8, 9, 10, 11, 12, 13, 14, 15, 24, 25, 26, 27, 28, 29, 30, 31, 40, 41, 42, 43, 44, 45, 46, 47, 56, 57, 58, 59, 60, 61, 62, 63]

const dictionaryPGN: any = {
  pawn: '',
  rook: 'r',
  bishop: 'b',
  queen: 'q',
  king: 'k',
  knight: 'n'

}

const boardPGN = BoardFactory.newBoard()

interface Coordinates {
  x: number,
  y: number
}
console.log(boardPGN.chessBoard)
const Chessboard = () => {

  const [positions, setPositions] = useState<Tile[]>([])
  const [from, setFrom] = useState<Coordinates | null>(null)
  const [to, setTo] = useState<Coordinates | null>(null)
  const [isValidFrom, setIsValidFrom] = useState(false)

  useEffect(() => {
    let linealBoard: Tile[] = []
    for (let i = 7; i >= 0; i--) {
      linealBoard = linealBoard.concat(boardPGN.chessBoard[i])
    }
    setPositions(linealBoard)
  }, [])


  useEffect(() => {
    if (from) {
      setIsValidFrom(true)
    } else {
      setIsValidFrom(false)
    }
  }, [from])

  useEffect(() => {

    if (from && to) {
      console.log('PGN :', dictionaryPGN[boardPGN.chessBoard[from.x][from.y].piece!.type], numberToLetter[to.y], to.x + 1)
      boardPGN.movePiece(from.x, from.y, to.x, to.y)
      setFrom(null)
      setTo(null)
    }
  }, [to, from])

  // console.log(from)
  // console.log(to)

  return (
    <div id='chessboard'>
      {positions.map((tile, index) =>
        <Spot
          key={index}
          x={tile.x}
          y={tile.y}
          number={horizontalLines.includes(index) ? index + 1 : index}
          image={tile.piece ? tile.piece.img : null}
          type={tile.piece ? tile.piece.type : null}
          setFrom={setFrom}
          setTo={setTo}
          isValidFrom={isValidFrom}
        />)}
    </div>

  )
}

export default Chessboard