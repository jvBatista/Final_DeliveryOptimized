import React, { useState, useEffect } from "react";
import { Map } from "../components/Map";
import { WeightedGraph } from '../utils/graph';
import { knapsack } from "../utils/knapsack";
import { items, tileWeights, types } from "../utils/tileTypes";
import bg_tile from '../assets/bg_tile.png'

export function MainPage() {
    const [tiles, setTiles] = useState([]);
    const [interactEnabled, setInteractEnabled] = useState(false);
    const [walkableTiles, setWalkableTiles] = useState([]);
    const [possibleDestinations, setPossibleDestinations] = useState([]);
    const [startPosition, setStartPosition] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [path, setPath] = useState([]);

    const closeToPlayer = (a, b) => {
        const distA = Math.abs(a - startPosition);
        const distB = Math.abs(b - startPosition);

        if (distA < distB) return -1;
        else if (distA > distB) return 1;
        return 0;
    }

    const bestItems = () => {
        const availableItems = possibleDestinations.map(possibleDestination => {
            const basicItem = items.find(item => item.name == possibleDestination.type);
            return { ...basicItem, position: possibleDestination.position }
        })

        const result = knapsack(10, availableItems);
        console.log(result.solutionItems)
        return result;
    }

    const handleLinkTiles = (graph) => {
        walkableTiles.map(tile => {
            walkableTiles
                .filter(other => {
                    if (Math.abs(tile.position - other.position) == 1) {
                        if (tile.position % 10 != 0 && other.position % 10 != 0) return other;
                        else if (tile.position % 10 == 0 && other.position < tile.position) return other;
                    }
                    else if (Math.abs(tile.position - other.position) == 10) return other;
                })
                .map(neighbor => {
                    if (!graph.adjList[tile.position].find(element => element.node == neighbor.position))
                        graph.addEdge(tile.position, neighbor.position, tileWeights[tile.type] || 1);
                })
        })
    }

    const handleSearch = () => {
        const { result, solutionItems } = bestItems();
        let destinations = solutionItems.map(item => item.position);
        destinations.sort(closeToPlayer);
        console.log(destinations);

        const graph = new WeightedGraph();
        walkableTiles.map(tile => graph.addVertex(tile.position));
        handleLinkTiles(graph);

        const fullPath = [];
        let partialPath;
        for (let i = 0; i < destinations.length; i++) {
            if (i == 0)
                partialPath = graph.dijkstraSearch(parseInt(startPosition), parseInt(destinations[i]));
            else
                partialPath = graph.dijkstraSearch(parseInt(destinations[i - 1]), parseInt(destinations[i]));

            fullPath.push(...partialPath);
        }

        console.log(fullPath);
        setPath(fullPath);
    }

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

    useEffect(() => {
        buildMap();
    }, []);

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
        let newpossibleDestinations = [];
        const itemTypes = items.map(item => item.name);

        tiles.map((tile) => {
            if (tile.type != 'tree') newWalkables.push(tile);
            if (itemTypes.includes(tile.type)) newpossibleDestinations.push(tile);
        })

        setWalkableTiles([...newWalkables]);
        setPossibleDestinations([...newpossibleDestinations]);
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
        changeMap();
    }, [interactEnabled]);


    return (
        <div
            className="bg-repeat font-bit font-normal h-full w-full flex flex-col items-center justify-start"
            style={{ backgroundImage: `url(${bg_tile})` }}
        >
            <div className="w-full bg-zinc-900 flex flex-col justify-center items-center py-6">
                <h1 className="text-center text-lg font-bold text-lime-100">
                    Bem vindo ao Farfetcher!!!
                </h1>
                <h2 className="w-full md:w-2/3 text-lime-100 text-center">
                    Monte o mapa de acordo com a puzzle que você quer resolver. Troque o tipo dos qudrados clicando neles
                </h2>
            </div>

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
                        Selecione a posição inicial:
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

                <button
                    onClick={handleSearch}
                    className="bg-zinc-900 text-lime-100 py-2 px-4 rounded-full"
                >
                    Calcular caminho
                </button>
            </div>
        </div>
    )
}
