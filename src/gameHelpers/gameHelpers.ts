import { Player } from "../hooks/usePlayer";
import { Stage } from "../hooks/useStage";

export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => {
     return Array.from(Array(STAGE_HEIGHT), ()=> 
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    )
    
}

interface Move {
    x: number;
    y: number;
};

export const checkCollision = (player: Player, stage:Stage, {x: moveX, y:moveY}:Move) => {
    for (let y=0;y<player.tetromino.length;y++){
        for(let x=0;x<player.tetromino[y].length;x++){
            
            //check that we are on tetor cell
            if(player.tetromino[y][x] !== 0) {
                //check move inside stage

                if(!stage[y+player.pos.y + moveY] ||
                     !stage[y+player.pos.y + moveY][x+player.pos.x + moveX] ||
                      stage[y+player.pos.y + moveY][x+player.pos.x + moveX][1] !== 'clear'){
                        console.log(`collision`)
                    return true;
                }
            }

        }
    }
}