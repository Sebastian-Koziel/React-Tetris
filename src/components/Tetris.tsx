import { useState } from "react"

import { StyledTetris } from "./styles/StyledTetris"
import { StyledTetrisWrapper } from "./styles/StyledTetrisWrapper"
import { createStage } from "../gameHelpers/gameHelpers"
import { checkCollision } from "../gameHelpers/gameHelpers"

//hooks
import { usePlayer } from "../hooks/usePlayer"
import { useStage } from "../hooks/useStage"
import { useGameStatus } from "../hooks/useGameStatus"

import { useInterval } from "../hooks/useInterval"

import Stage from "./Stage"
import Display from "./Display"
import StartButton from "./StartButton"


const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);


  const movePlayer = (dir: number) => {
    if(!checkCollision(player, stage, {x:dir, y:0})){
      updatePlayerPos({x:dir, y:0, collided:false});
    }
    
  }

  const startGame = () => {
    //reset
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setLevel(0);
    setRows(0);
  }

  const drop = () => {
    //increase leve when 10 rows cleared
    if(rows > (level+1) * 10){
      setLevel(prev => prev + 1);
      //increase speed
      setDropTime(1000 / (level + 1) + 200)
    }
    if(!checkCollision(player, stage, {x:0, y:1})){
      updatePlayerPos({x:0, y:1, collided: false})
    } else {
      if(player.pos.y < 1){
        console.log(`game over`);
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({x:0,y:0, collided: true})
    }
    
  }

  const keyUp = ({keyCode}) => {
    if(!gameOver){  
      if(keyCode === 40) {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  }

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  }

  const move = ({keyCode}) => {
    if(!gameOver) {
      if(keyCode === 37){
        movePlayer(-1);
      } else if (keyCode === 39){
        movePlayer(1);
      } else if (keyCode === 40){
        dropPlayer();
      } else if (keyCode === 38){
        playerRotate(stage, 1);
      }
    }
  }

  useInterval(()=> {
    drop();
  }, dropTime)

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
        <StyledTetris>
        <Stage stage={stage}/>
        <aside>
          {gameOver ?  (
            <Display gameOver={gameOver} text={"Game Over"} />
          ) : (
        <div>
        <Display gameOver={false} text={`Score: ${score}`}/>
        <Display gameOver={false} text={`Rows: ${rows}`}/>
        <Display gameOver={false} text={`Level: ${level}`}/>
        </div>
          )}
          <StartButton callBack={startGame}/>
        </aside>
        
        </StyledTetris>
    </StyledTetrisWrapper>
  )
}

export default Tetris