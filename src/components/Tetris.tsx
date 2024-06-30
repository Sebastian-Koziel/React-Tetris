
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
        <aside>
        <div>
        <Display text="Score"/>
        <Display text="Rows"/>
        <Display text="Level"/>
        <StartButton />
        </div>
        </aside>
        
        </StyledTetris>
    </StyledTetrisWrapper>
  )
}

export default Tetris