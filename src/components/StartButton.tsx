import { StyledStartButton } from "./styles/StyledStartButton"


const StartButton = ( { callBack }:any) => {
  return (
    <StyledStartButton onClick={callBack}>Start Game</StyledStartButton>
  )
}

export default StartButton