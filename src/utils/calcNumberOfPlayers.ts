export const calcNumberOfPlayers = (player1: string, player2: string): number => {
  let count = 0;
  if (player1 !== '') {
    count++
  }
  if (player2 !== '') {
    count++
  }
  return count
}