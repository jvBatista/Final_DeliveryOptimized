import React, { useState, useEffect } from "react";
import { Map } from "../components/Map";
import { items, types } from "../utils/tileTypes";

export function CenterSection({
    path,
    setPath,
    capacity,
    setCapacity,
    updateTiles,
    handleSearch,
    updateStart
}) {
    const [tiles, setTiles] = useState([]);
    const [interactEnabled, setInteractEnabled] = useState(false);
    const [walkableTiles, setWalkableTiles] = useState([]);
    const [possibleDestinations, setPossibleDestinations] = useState([]);
    const [startPosition, setStartPosition] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const buildMap = () => {
        let newTiles = [];
        for (var i = 1; i <= 100; i++) {
            newTiles.push(
                {
                    position: i,
                    type: 'floor'
                }
            );
        }

        setTiles([...newTiles]);
        setWalkableTiles([...newTiles]);
    }

    const changeTileType = (position) => {
        let newTiles = tiles;

        const currentType = newTiles.find(tile => tile.position == position).type;
        const currentTypeIndex = types.indexOf(currentType);
        const newIndex = currentTypeIndex == types.length - 1 ? 0 : currentTypeIndex + 1;
        let newType = types[newIndex];

        newTiles.find(tile => tile.position == position).type = newType;
        setTiles([...newTiles]);
    }

    const changeMap = () => {
        let newWalkables = [];
        let newPossibleDestinations = [];
        const itemTypes = items.map(item => item.name);

        tiles.map((tile) => {
            if (tile.type != 'tree') newWalkables.push(tile);
            if (itemTypes.includes(tile.type)) newPossibleDestinations.push(tile);
        })

        setWalkableTiles([...newWalkables]);
        setPossibleDestinations([...newPossibleDestinations]);
    }

    const handleSetStartPosition = (position) => {
        if (interactEnabled) setErrorMessage("*Termine seu mapa antes de selecionar as posições!");
        else {
            const posTile = tiles.find(tile => tile.position == parseInt(position));

            if (posTile.type != 'floor')
                setErrorMessage("*Posição inicial inválida! Escolha uma posição nos quadrados vazios");
            else {
                setStartPosition(position);
                setErrorMessage("");
                setPath([]);
            }
        }

    }

    useEffect(() => {
        buildMap();
    }, []);

    useEffect(() => {
        updateTiles(walkableTiles, possibleDestinations);
    }, [walkableTiles, possibleDestinations]);

    useEffect(() => {
        updateStart(startPosition);
    }, [startPosition]);

    useEffect(() => {
        changeMap();
    }, [interactEnabled]);


    return (
        <div className="lg:w-[500px] flex flex-col items-center justify-center gap-6 mt-6 px-6">
            <div className="h-96 md:h-[525px] flex items-center justify-center">
                <Map
                    interactEnabled={interactEnabled}
                    tiles={tiles}
                    changeTileType={changeTileType}
                    startPosition={startPosition}
                    path={path}
                />
            </div>


            <button
                onClick={() => {
                    setInteractEnabled(!interactEnabled);
                    setPath([]);
                }}
                className="bg-zinc-900 text-lime-100 py-2 px-4 rounded-full"
            >
                {interactEnabled ? 'Finalizar mapa' : 'Alterar mapa'}
            </button>

            {errorMessage &&
                <p className="w-full text-left text-red-500">
                    {errorMessage}
                </p>
            }

            <div className="w-full flex gap-2 justify-start items-center">
                <p className="text-left">
                    Informe a posição inicial:
                </p>
                <input
                    className="bg-green-100 bg-opacity-50 text-end outline-none w-16"
                    onChange={(e) => handleSetStartPosition(e.target.value)}
                    value={startPosition}
                    type="number"
                    min={1}
                    max={100}
                />
            </div>

            <div className="w-full flex gap-2 justify-start items-center">
                <p className="text-left">
                    Informe a capacidade da mochila:
                </p>
                <input
                    className="bg-green-100 bg-opacity-50 text-end outline-none w-16"
                    onChange={(e) => setCapacity(e.target.value)}
                    value={capacity}
                    type="number"
                    min={1}
                    max={2000}
                />
            </div>

            <button
                onClick={handleSearch}
                className="bg-zinc-900 text-lime-100 py-2 px-4 rounded-full"
            >
                Calcular caminho
            </button>
        </div>
    )
}
