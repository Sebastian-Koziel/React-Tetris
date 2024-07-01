import { useEffect, useState } from "react";

import { createStage } from "../gameHelpers/gameHelpers";
import { Player } from "./usePlayer";

export type StageCell =[number, string];
export type Stage =  StageCell[][];

export const useStage = (player: Player, resetPlayer: ()=>void) => {

    const  [stage, setStage] = useState(createStage());

    useEffect(()=> {
        const updateStage = (prevStage:Stage) => {
            //reset
            const newStage = prevStage.map(row =>
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
            );
            //draw shape
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if(value !== 0){
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`
                        ]
                    }
                });
            });
            //check collisions
            if(player.collided) {
                console.log(`dsdd`)
                resetPlayer();
            }
            return newStage;

        };

        setStage(prev => updateStage(prev))

        

    }, [player, resetPlayer]);

    return [stage, setStage];
};