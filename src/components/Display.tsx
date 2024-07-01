
import { StyledDisplay } from "./styles/StyledDisplay"

interface DisplayProps {
  gameOver: boolean
  text: string
}

const Display:React.FC<DisplayProps> = ({gameOver, text}) => {
  return (
    <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
  )
}

export default Display