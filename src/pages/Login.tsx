import React, { useContext, useState, } from 'react'
import { LANDING_PAGE } from '../routes/routes';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext/AuthCreateContext';

const Login = () => {
  const navigate = useNavigate()
  const { startLogin } = useContext(AuthContext)
  const [username, setUsername] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (username.length < 6) {
      alert('Please enter a valid username with at least 6 characters')
      return false
    }
    startLogin(username).then(() => { navigate(LANDING_PAGE) })

  }


  return (
    <div className='screen'>
      <div className=" p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <i className="fa-solid fa-chess fa-7x pb-11 justify-center flex items-center text-blue-900" />
        <form onSubmit={handleSubmit} className="space-y-6" action="#">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">Access to chess-app platform</h5>
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your username</label>
            <input
              value={username}
              onChange={handleChange}
              name="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="chess-app username" required />
          </div>


          <button type="submit" className=" w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            {/* <Link to={LANDING_PAGE}>Login</Link> */}
            Login
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login