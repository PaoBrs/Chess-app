import React, { useContext, useEffect, useState } from 'react'
import { CHESS_GAME } from '../routes/routes';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext, Game } from '../context/AuthContext/AuthCreateContext';
import { getActiveGames } from '../services/chessboardServices';
import { calcNumberOfPlayers } from '../utils/calcNumberOfPlayers';

const LandingPage = () => {

  const { startCreateGame } = useContext(AuthContext)
  const [activeGames, setActiveGames] = useState<Game[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    getActiveGames().then((games) => { setActiveGames(games); });
  }, [])


  const handleClick = () => {
    startCreateGame().then(() => { navigate(CHESS_GAME) })
  }
  return (
    <div className='screen'>
      <div className=" p-4 max-w-sm bg-white rounded-lg border shadow-md sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <p className="text-sm font-normal text-gray-500 dark:text-gray-400 pb-2">Connect with other players in active games or create a new one.</p>

        <button
          onClick={handleClick}
          type="button"
          className=" w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">

          <Link to={CHESS_GAME}>Create new game</Link>
        </button>

        <h5 className="mb-3 text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
          Active Games
        </h5>
        <ul className="my-4 space-y-3">
          {activeGames.map((game) => {
            return (
              <li key={game._id}>
                <div className='bg-gray-300'>
                  <i className="fa-solid fa-game-board fa-7x text-gray-500" />
                  <span className="flex-1 ml-3 whitespace-nowrap">Room {game.roomCode} {`${calcNumberOfPlayers(game.player1, game.player2)}/2`} </span>
                  <button className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                    Join
                  </button>
                </div>
              </li>)
          })}


        </ul>

        <form>
          <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Your Email</label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <i className="fa-solid fa-chess fa-2x pb-2 text-gray-300" />
            </div>
            <input type="search" id="search" className="block p-4  pl-12 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Room Code" required />
            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Join</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LandingPage