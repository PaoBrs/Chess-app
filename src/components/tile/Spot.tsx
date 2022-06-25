import './Tile.css'
import { numberToLetter } from '../../utils/numberToLetter';

type Props = {
  number: number;
  image: string | null;
  type: string | null;
  x: number;
  y: number;
  setFrom: (index: Coordinates | null) => void;
  isValidFrom: boolean;
  setTo: (index: Coordinates | null) => void;

}

interface Coordinates {
  x: number,
  y: number,
}


const Spot = ({ number, image, type, x, y, setFrom, isValidFrom, setTo }: Props) => {
  const handlerClick = () => {
    if (!isValidFrom) {

      if (image) {
        setFrom({ x, y })
        console.log('from: ', numberToLetter[y], x + 1)
      } else {
        setFrom(null)
      }

    } else {
      setTo({ x, y })
      console.log('to: ', numberToLetter[y], x + 1)

    }

    console.log(image)
  }

  if (number % 2 === 0) {
    return <button onClick={handlerClick} className='tile white-tile'>{image ? <img src={`/images/${image}`} alt='.' className='piece' /> : null}</button>
  } else {
    return <button onClick={handlerClick} className='tile black-tile'>{image ? <img src={`/images/${image}`} alt='.' className='piece' /> : null}</button>
  }


}

export default Spot