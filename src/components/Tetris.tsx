
import { createStage } from "../gameHelpers/gameHelpers"
import { StyledTetris } from "./styles/StyledTetris"
import { StyledTetrisWrapper } from "./styles/StyledTetrisWrapper"

import Stage from "./Stage"
import Display from "./Display"
import StartButton from "./StartButton"

const Tetris = () => {
  return (
    <StyledTetrisWrapper>
        <StyledTetris>
        <Stage stage={createStage()}/>
        <div>
        <Display text="Score"/>
        <Display text="Rows"/>
        <Display text="Level"/>
        </div>
        <StartButton />
        </StyledTetris>
    </StyledTetrisWrapper>
  )
}

export default Tetris