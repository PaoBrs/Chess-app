/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import Spot from '../tile/Spot';
import './Chessboard.css'
import { BoardFactory } from '../board/board';
import { Tile } from '../board/tile';
import { horizontalLines } from '../../utils/horizontalLines';
import { SocketContext } from '../../context/SocketCreateContext';
import { Button } from 'flowbite-react';
import ReactHowler from 'react-howler'
import { AuthContext, User, Game } from '../../context/AuthContext/AuthCreateContext';
import { useNavigate } from 'react-router-dom';
import { LOGIN, LANDING_PAGE } from '../../routes/routes';


const boardPGN = BoardFactory.newBoard()

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const numbers = [8, 7, 6, 5, 4, 3, 2, 1]

interface Coordinates {
  x: number,
  y: number
}

const Chessboard = () => {

  const { game, user, setLoggedUser, setCurrentGame, startLogout } = useContext(AuthContext)
  const navigate = useNavigate()

  const [positions, setPositions] = useState<Tile[]>([])
  const [from, setFrom] = useState<Coordinates | null>(null)
  const [to, setTo] = useState<Coordinates | null>(null)
  const [isValidFrom, setIsValidFrom] = useState(false)
  const [possibleMoves, setPossibleMoves] = useState<Coordinates[]>([])
  const [turn, setTurn] = useState(boardPGN.turn)
  const [isSoundErrorActive, setSoundErrorActive] = useState(false)
  const [colorPlayer, setColorPlayer] = useState<'white' | 'black'>('white')

  const { socket } = useContext(SocketContext)

  useEffect(() => {
    if (!user || !game) {
      let loggedUser: string | User | null = localStorage.getItem('user')

      if (loggedUser) {
        loggedUser = JSON.parse(loggedUser) as User
        setLoggedUser(loggedUser)
      } else {
        navigate(LOGIN)
      }

      let currentGame: string | Game | null = localStorage.getItem('game')

      if (currentGame) {
        currentGame = JSON.parse(currentGame) as Game

        socket.emit('requestBoard', 'getBoard', currentGame.roomCode)
        setCurrentGame(currentGame)
      } else {
        navigate(LANDING_PAGE)
      }

      let lastTurn = localStorage.getItem('turn')

      if (lastTurn) {
        setTurn(lastTurn as 'white' | 'black')
      } else {
        setTurn('white')
      }
    }
  }, [])


  useEffect(() => {
    if (game) {
      boardPGN.generateBoardFromBackend(game.positions)

      let linealBoard: Tile[] = []
      for (let i = 7; i >= 0; i--) {
        linealBoard = linealBoard.concat(boardPGN.chessBoard[i])
      }
      setPositions(linealBoard)
    }
    if (game?.player1 === user?.username) {
      setColorPlayer('white')
    } else if (game?.player2 === user?.username) {
      setColorPlayer('black')
    }

  }, [game])


  useEffect(() => {

    if (from) {
      const colorFrom = boardPGN.chessBoard[from.x][from.y].piece!.color;
      if (colorFrom === turn && colorFrom === colorPlayer) {
        setIsValidFrom(true)
        setPossibleMoves(boardPGN.moves.possibleMoves(from.x, from.y, boardPGN.chessBoard))
      } else {
        setIsValidFrom(false)
        setFrom(null)
        setSoundErrorActive(true)
      }
    } else {
      setIsValidFrom(false)
    }
  }, [from])

  useEffect(() => {

    if (from && to) {
      const tile = boardPGN.chessBoard[to.x][to.y];
      boardPGN.movePiece(from.x, from.y, to.x, to.y, tile.isOccupied(), colorPlayer)

      setFrom(null)
      setTo(null)
      setPossibleMoves([])
      setTurn(boardPGN.turn)
      localStorage.setItem('turn', boardPGN.turn)

      socket.emit('movePiece', from.x, from.y, to.x, to.y)
      socket.emit('boardChange', boardPGN.fromObjectToJson(boardPGN.chessBoard), game!.roomCode)

    }
  }, [to, from])

  useEffect(() => {
    socket.on('movePieceBack', (xFrom, yFrom, xTo, yTo) => {
      const tileFrom = boardPGN.chessBoard[xFrom][yFrom];
      if (tileFrom.isOccupied()) {
        const tileTo = boardPGN.chessBoard[xTo][yTo];
        boardPGN.movePiece(xFrom, yFrom, xTo, yTo, tileTo.isOccupied(), colorPlayer)

        setTurn(boardPGN.turn)
        localStorage.setItem('turn', boardPGN.turn)

        let linealBoard: Tile[] = []
        for (let i = 7; i >= 0; i--) {
          linealBoard = linealBoard.concat(boardPGN.chessBoard[i])
        }

        setPositions(linealBoard)
      }
    })

    socket.on('boardChangedBack', (board) => {

      boardPGN.generateBoardFromBackend(board)

      let linealBoard: Tile[] = []
      for (let i = 7; i >= 0; i--) {
        linealBoard = linealBoard.concat(boardPGN.chessBoard[i])
      }
      setPositions(linealBoard)

    })

    socket.on('savedBoard', (board) => {
      boardPGN.generateBoardFromBackend(board)

      let linealBoard: Tile[] = []
      for (let i = 7; i >= 0; i--) {
        linealBoard = linealBoard.concat(boardPGN.chessBoard[i])
      }
      setPositions(linealBoard)
    })

    return () => {
      socket.off('movePieceBack')
    }
  }, [socket])

  const handleLogout = () => {
    startLogout()
    navigate(LOGIN)
  }


  return (
    <div className='screen'>
      <div className='flex justify-between pb-10'>
        <div className='text-4xl font-bold tracking-tight text-black'>{user?.username}: {colorPlayer}
          <br /> Room ID: {game?.roomCode}</div>
        <button
          type="button"
          onClick={handleLogout}
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
          Logout
        </button>
      </div>
      <div className='flex flex-col-3 gap-x-20'>
        <div>

          <div className='flex flex-col space-y-72 mt-12'>
            <div className='fallen-pieces'></div>
            <div className='fallen-pieces'></div>
          </div>
        </div>
        <div>
          <div className='flex flex-row justify-center items-center gap-2 pb-4'>
            <div className={`rounded-full w-6 h-6 ${turn === 'white' ? 'transparent' : 'bg-green-300'}`}></div>
            <h5 className="text-2xl font-bold tracking-tight text-black text-center">
              Player 2
            </h5></div>
          <div className='container'>
            <div className='numberAxis main-axis'>{numbers.map((number, index) => <div key={index} className='number axis-item'>{number}</div>)}</div>
            <hr className='break' />
            <div id='chessboard'>
              {positions.map((tile, index) => {
                return <Spot
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
                />
              })}
            </div>
          </div>
          <div className='letterAxis main-axis'>{letters.map((letter, index) => <div key={index} className='letter axis-item'> {letter}</div>)}</div>
          <div className='flex flex-row justify-center items-center gap-2 pt-4'><div className={`rounded-full w-6 h-6 ${turn === 'white' ? 'bg-green-300' : 'transparent'}`}></div>
            <h5 className="text-2xl font-bold tracking-tight text-black text-center">
              Player 1
            </h5></div>
        </div>
        <div className='flex flex-col justify-between'>
          <div className='flex flex-col text-3xl font-bold gap-4'>Turn
            <i className={`fa-solid fa-chess fa-3x ${turn === 'white' ? 'text-white' : 'text-black'}`} />
          </div>

          <Button gradientDuoTone="purpleToBlue" size="xl">
            Save Match
          </Button></div>
      </div>
      <ReactHowler
        src='/sounds/error.wav'
        playing={isSoundErrorActive}
        onEnd={() => setSoundErrorActive(false)} />
    </div>

  )
}

export default Chessboard