import { useCallback, useState } from "react";

import { TESTROMINOS, randomTetromino } from "../gameHelpers/tetrominos";
import { STAGE_WIDTH, checkCollision } from "../gameHelpers/gameHelpers";

export interface Position {
    x: number;
    y: number;
  };

export interface Player {
    pos: Position;
    tetromino: (number | string)[][];
    collided: boolean;
  };

export interface UpdatePlayerPosProps {
    x: number;
    y: number;
    collided: boolean;
  };

export const usePlayer = () => {
    const  [player, setPlayer] = useState({
        pos: {x:0,y:0},
        tetromino: TESTROMINOS[0].shape,
        collided: false
    });

    const rotate = (matrix, dir) => {
        const rotatedTetro = matrix.map((value, index) => 
            matrix.map(col => col[index]));
        if(dir > 0){return rotatedTetro.map(row => row.reverse());}
        return rotatedTetro.reverse();
    }

    const playerRotate = (stage, dir) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        const pos = clonedPlayer.pos.x;
        let offSet = 1;
        while(checkCollision(clonedPlayer, stage, {x: 0, y:0})) {
            clonedPlayer.pos.x += offSet;
            offSet = -(offSet + (offSet > 0 ? 1 : -1));
            if(offSet > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -dir);
                clonedPlayer.pos.x = pos;
                return;
            }
        }

        setPlayer(clonedPlayer);
    }

    const updatePlayerPos = ({x, y, collided}:UpdatePlayerPosProps):void => {
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x + x), y: (prev.pos.y + y)},
            collided,
        }))
    }

    const resetPlayer = useCallback((): void=> {
        setPlayer({
            pos: {x: STAGE_WIDTH / 2-2, y:0},
            tetromino: randomTetromino().shape,
            collided: false
        })
    }, []);

    return [player, updatePlayerPos, resetPlayer, playerRotate];
}