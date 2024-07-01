import { useCallback, useState } from "react";

import { TESTROMINOS, randomTetromino } from "../gameHelpers/tetrominos";
import { STAGE_WIDTH } from "../gameHelpers/gameHelpers";

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

    return [player, updatePlayerPos, resetPlayer];
}