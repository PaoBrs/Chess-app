import React from 'react'
import { Button } from 'flowbite-react';

const Login = () => {
  return (
    <div className="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
      <i className="fa-solid fa-chess fa-7x pb-11 justify-center flex items-center text-blue-900" />
      <form className="space-y-6" action="#">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Access to chess-app platform</h5>
        <div>
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your username</label>
          <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="chess-app username" required />
        </div>

        <div className="flex items-start">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
            </div>
            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
          </div>
        </div>
        <button type="button" className=" w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Login</button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
        </div>
      </form>
    </div>
  )
}

export default Login