const baseUrl = process.env.NODE_ENV === 'production' ?
  process.env.REACT_APP_BASE_URL_PROD : process.env.REACT_APP_BASE_URL_DEV

export const createOrLoginUser = async (username: string) => {
  const response = await fetch(`${baseUrl}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username })
  })
  if (!response.ok) {
    return new Error('Error creating or login user')
  }
  return response.json()
}

export const createGame = async (player1: string) => {
  const response = await fetch(`${baseUrl}/games/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      roomCode: Math.round(Math.random() * 500000000),
      player1
    })
  })

  if (!response.ok) {
    return new Error('Error creating game')
  }
  return response.json()
}

export const getActiveGames = async () => {
  const response = await fetch(`${baseUrl}/games/active`)

  if (!response.ok) {
    return new Error('Error getting active games')
  }
  return response.json()
}
