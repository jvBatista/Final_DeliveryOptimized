import React, { useState } from "react";
import player from '../assets/player.png';
import pokeball from '../assets/pokeball.png';
import { sprites } from "../utils/tileTypes";

export function Tile({
    tile,
    isInteractive,
    changeType,
    isStartTile,
    inPath
}) {
    const [type, setType] = useState(tile.type);

    return (
        <button
            onClick={() => {
                changeType(tile.position);
                setType(tile.type);
            }}
            disabled={!isInteractive}
            className="bg-transparent h-8 w-8 md:h-12 md:w-12 flex items-center justify-center relative"
        >

            {sprites[type] && <img
                src={sprites[type]}
                alt="img"
                className="w-full h-full"
            />}

            {isStartTile &&
                <img
                    src={player}
                    alt="player"
                    className="absolute bottom-4 w-[80%] h-[80%]"
                />
            }

            {inPath &&
                <img
                    src={pokeball}
                    alt="pokeball"
                    className="absolute bottom-4 w-1/3 h-1/3"
                />
            }


            <div className={`absolute font-medium text-xs bottom-0 right-1 ${tile.type == 'tree' ? 'text-white' : ''}`}>
                {tile.position}
            </div>
        </button>
    )
}