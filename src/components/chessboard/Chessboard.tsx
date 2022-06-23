/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import initialiseChessBoard from '../../utils/initalPosition';
import Tile from '../tile/Tile';
import './Chessboard.css'
import { PieceFactory, Piece } from '../../pieces/piece';
import { Board } from '../board/board';


const horizontalAxis = ["a", "b", "c", "d", "f", "g", "f", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"]
const horizontalLines = [8, 9, 10, 11, 12, 13, 14, 15, 24, 25, 26, 27, 28, 29, 30, 31, 40, 41, 42, 43, 44, 45, 46, 47, 56, 57, 58, 59, 60, 61, 62, 63]

const boardTest = new Board()

console.log(boardTest)
const Chessboard = () => {

  const [positions, setPositions] = useState<(Piece | null)[]>([])
  const [from, setFrom] = useState<number | null>(null)
  const [to, setTo] = useState<number | null>(null)
  const [isValidFrom, setIsValidFrom] = useState(false)

  console.log(from, to)

  useEffect(() => {
    // if (from) {
    //   if (positions[from].isMoveValid(from, to, false)) {
    //     const newPositions = movePieces(from, to, positions)
    //     console.log('holiiii')
    //     setPositions(newPositions)
    //     console.log(newPositions)
    //   }
    // }
    if (from && to) {
      PieceFactory.moveTo([...positions], from, to, setPositions)
      setFrom(null)
      setTo(null)
    }
  }, [to, from])


  useEffect(() => {
    if (from) {
      setIsValidFrom(true)
    } else {
      setIsValidFrom(false)
    }
  }, [from])


  useEffect(() => {
    setPositions(initialiseChessBoard())
  }, [])

  return (
    <div id='chessboard'>
      {positions.map((position, index) =>
        <Tile
          key={index}
          index={index}
          number={horizontalLines.includes(index) ? index + 1 : index}
          image={position ? position.img : null}
          setFrom={setFrom}
          setTo={setTo}
          isValidFrom={isValidFrom}
        />)}
    </div>
  )
}

export default Chessboard