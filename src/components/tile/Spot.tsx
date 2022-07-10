import './Tile.css'
import React, { useEffect, useState } from 'react';

type Props = {
  number: number;
  image: string | null;
  type: string | null;
  x: number;
  y: number;
  from: Coordinates | null;
  setFrom: (index: Coordinates | null) => void;
  isValidFrom: boolean;
  setTo: (index: Coordinates | null) => void;
  possibleMoves: Coordinates[]

}

interface Coordinates {
  x: number,
  y: number,
}


const Spot = ({ number, image, type, x, y, setFrom, from, isValidFrom, setTo, possibleMoves }: Props) => {

  const [highlightMove, setHighlightMove] = useState(false)

  const [activeSpot, setActiveSpot] = useState(false)


  useEffect(() => {
    setActiveSpot(from?.x === x && from?.y === y)
  }, [from])

  useEffect(() => {
    let isHightlighted = false
    possibleMoves.forEach(coord => {
      if (coord.x === x && coord.y === y) {
        isHightlighted = true
      }
    }
    )
    if (isHightlighted) {
      setHighlightMove(true)
    } else {
      setHighlightMove(false)
    }
  }, [possibleMoves])




  const handlerClick = () => {
    // console.log({ from })
    // console.log(x, y)
    if (!isValidFrom) {

      if (image) {
        setFrom({ x, y })
        // console.log('from: ', numberToLetter[y], x + 1)
      } else {
        setFrom(null)
      }

    } else {
      setTo({ x, y })
      // console.log('to: ', numberToLetter[y], x + 1)

    }

    // console.log(image)
    // console.log(number)
  }

  if (number % 2 === 0) {
    return <button onClick={handlerClick} className={`tile white-tile ${activeSpot ? 'activeSpot' : ''} ${highlightMove ? 'highlight-white' : ''}`}>{image ? <img src={`/images/${image}`} alt='.' className='piece' /> : null}</button>
  } else {
    return <button onClick={handlerClick} className={`tile black-tile ${activeSpot ? 'activeSpot' : ''} ${highlightMove ? 'highlight-black' : ''}`}>{image ? <img src={`/images/${image}`} alt='.' className='piece' /> : null}</button>
  }


}

export default Spot