import React, { useState } from "react";
import flowers from '../assets/flowers.png';
import player from '../assets/player.png';
import rock from '../assets/rock.png';
import floor from '../assets/floor.png';
import sticks from '../assets/sticks.png';
import tree from '../assets/tree.png';
import pokeball from '../assets/pokeball.png';
import pokemon from '../assets/pokemon.png';


export function Tile({
    tile,
    isInteractive,
    changeType,
    isStartTile,
    inPath
}) {
    const tileVariants = {
        "floor": floor,
        "rock": rock,
        "flowers": flowers,
        "sticks": sticks,
        "pokemon": pokemon,
        "tree": tree
    }
    const [mode, setMode] = useState(tile.type);

    return (
        <button
            onClick={() => {
                changeType(tile.position);
                setMode(tile.type);
            }}
            disabled={!isInteractive}
            className="bg-transparent h-8 w-8 md:h-12 md:w-12 flex items-center justify-center relative"
        >

            {tileVariants[mode] && <img
                src={tileVariants[mode]}
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