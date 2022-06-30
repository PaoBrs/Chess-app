/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Spot from '../tile/Spot';
import './Chessboard.css'
import { BoardFactory } from '../board/board';
import { Tile } from '../board/tile';
import { numberToLetter } from '../../utils/numberToLetter';
import { horizontalLines } from '../../utils/horizontalLines';

const dictionaryPGN: any = {
  pawn: '',
  rook: 'r',
  bishop: 'b',
  queen: 'q',
  king: 'k',
  knight: 'n'

}

const boardPGN = BoardFactory.newBoard()

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const numbers = [8, 7, 6, 5, 4, 3, 2, 1]

interface Coordinates {
  x: number,
  y: number
}

const Chessboard = () => {

  const [positions, setPositions] = useState<Tile[]>([])
  const [from, setFrom] = useState<Coordinates | null>(null)
  const [to, setTo] = useState<Coordinates | null>(null)
  const [isValidFrom, setIsValidFrom] = useState(false)
  const [possibleMoves, setPossibleMoves] = useState<Coordinates[]>([])

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
      setPossibleMoves(boardPGN.moves.possibleMoves(from.x, from.y, boardPGN.chessBoard))
    } else {
      setIsValidFrom(false)
    }
  }, [from])

  useEffect(() => {

    if (from && to) {
      const tile = boardPGN.chessBoard[to.x][to.y];
      // console.log('PGN :', dictionaryPGN[boardPGN.chessBoard[from.x][from.y].piece!.type], numberToLetter[to.y], to.x + 1)
      // console.log(tile.isOccupied())
      boardPGN.movePiece(from.x, from.y, to.x, to.y, tile.isOccupied())
      setFrom(null)
      setTo(null)
      setPossibleMoves([])
    }
  }, [to, from])

  return (
    <>
      <div className='container'>
        <div className='numberAxis main-axis'>{numbers.map((number, index) => <div key={index} className='number axis-item'>{number}</div>)}</div>
        <hr className='break' />
        <div id='chessboard'>
          {positions.map((tile, index) =>
            <Spot
              key={index}
              x={tile.x}
              y={tile.y}
              number={horizontalLines.includes(index) ? index + 1 : index}
              image={tile.piece ? tile.piece.img : null}
              type={tile.piece ? tile.piece.type : null}
              from={from}
              setFrom={setFrom}
              setTo={setTo}
              isValidFrom={isValidFrom}
              possibleMoves={possibleMoves}
            />)}
        </div>
      </div>
      <div className='letterAxis main-axis'>{letters.map((letter, index) => <div key={index} className='letter axis-item'> {letter}</div>)}</div>
    </>

  )
}

export default Chessboard