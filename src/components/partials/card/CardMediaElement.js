import {CardMedia} from '@rmwc/card'

const CardMediaElement = ({style, sixteenByNine, square, children}) => {
  return (
    <CardMedia style={style}
               sixteenByNine={sixteenByNine}
               className="progressive-img-blur-container"
               square={square}>
      {children}
    </CardMedia>
  )
}
export default CardMediaElement
