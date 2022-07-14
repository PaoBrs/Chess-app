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
    <div>




      <div className='screen'>

        <div className='flex justify-end pt-4 pr-4'>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Logout</button>
        </div>

        <div id="alert-2" className="flex justify-center " role="alert">
          <div id="alert-3" className=" w-full flex p-4 mb-4 bg-yellow-100 rounded-lg" role="alert">
            <svg className="flex-shrink-0 w-5 h-5 text-yellow-700 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <div className="ml-3 text-sm font-medium text-yellow-700">
              Do you want to continue with last match?
            </div>
            <div className='flex gap-4 pl-2'>
              <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-yellow-100 text-yellow-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-yellow-200 inline-flex h-8 w-8 " data-dismiss-target="#alert-3" aria-label="Close">
                Yes
              </button>
              <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-yellow-100 text-yellow-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-yellow-200 inline-flex h-8 w-8" data-dismiss-target="#alert-3" aria-label="Close">
                No
              </button>
            </div>
          </div>
        </div>

        <div className='flex flex-col-2 gap-10'>
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
            <ul className="my-4 space-y-3 h-96 overflow-y-scroll">
              {activeGames.map((game) => {
                return (
                  <li key={game._id}>
                    <div className='flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow'>
                      <i className="fa-solid fa-game-board fa-7x text-gray-500" />
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Room {game.roomCode}<span className={`${calcNumberOfPlayers(game.player1, game.player2) === 1 ? 'bg-green-300 text-green-700' : 'bg-gray-200 text-gray-500'}  rounded inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium`}> {`${calcNumberOfPlayers(game.player1, game.player2)}/2`} </span></span>
                      <button className={`inline-flex items-center justify-center px-4 py-2 ml-3 text-xs font-medium  ${calcNumberOfPlayers(game.player1, game.player2) === 1 ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-500'} rounded`}>
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

          <div>
            <div className="p-4 max-w-sm bg-white rounded-lg border shadow-md sm:p-6  w-96">
              <h5 className="mb-3 text-base font-semibold text-gray-900 lg:text-xl ">
                Match History
              </h5>
              <ul className="my-4 space-y-3 h-[550px]">
                <li>
                  <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                    <span className="flex-1 ml-3 whitespace-nowrap">Room</span>
                    <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Victory</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                    <span className="flex-1 ml-3 whitespace-nowrap">Room</span>
                    <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Defeated</span>

                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                    <span className="flex-1 ml-3 whitespace-nowrap">Room</span>
                    <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Victory</span>

                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                    <span className="flex-1 ml-3 whitespace-nowrap">Room</span>
                    <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Victory</span>

                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                    <span className="flex-1 ml-3 whitespace-nowrap">Room</span>
                    <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Victory</span>

                  </a>
                </li>
              </ul>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage