import React, { useState } from "react";
import { WeightedGraph } from '../utils/graph';
import { knapsack } from "../utils/knapsack";
import { items, tileWeights } from "../utils/tileTypes";
import { CenterSection } from "../components/CenterSection";
import { TileTable } from "../components/TileTable";
import { ItemTable } from "../components/ItemTable";
import { InventoryTable } from "../components/InventoryTable";
import bg_tile from '../assets/bg_tile.png'

export function MainPage() {
    const [capacity, setCapacity] = useState(500);
    const [startPosition, setStartPosition] = useState("");
    const [walkableTiles, setWalkableTiles] = useState([]);
    const [possibleDestinations, setPossibleDestinations] = useState([]);
    const [chosenItems, setChosenItems] = useState([]);
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
        console.log(availableItems)

        const result = knapsack(capacity, availableItems);
        console.log(result)
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
        const { solutionItems } = bestItems();

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
        setChosenItems(solutionItems);
    }

    const updateTiles = (newWalkables, newPossibleDesinations) => {
        setWalkableTiles(newWalkables);
        setPossibleDestinations(newPossibleDesinations);
    }

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

            <div className="w-full flex-grow flex p-6 items-start justify-center gap-10">
                <div className="flex flex-col gap-6">
                    <TileTable />
                    <ItemTable />
                </div>

                <CenterSection
                    path={path}
                    setPath={setPath}
                    capacity={capacity}
                    setCapacity={setCapacity}
                    updateTiles={updateTiles}
                    updateStart={position => setStartPosition(position)}
                    handleSearch={handleSearch}
                />
                <div>
                    <InventoryTable items={chosenItems} capacity={capacity} />
                </div>
            </div>

        </div>
    )
}
