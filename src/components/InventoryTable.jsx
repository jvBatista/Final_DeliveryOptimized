import React from "react";
import { sprites } from "../utils/tileTypes";

export function InventoryTable({ capacity, items }) {
    const profit = items
        .map(item => item.price)
        .reduce((acc, curr) => acc + curr, 0);
    const filled = items
        .map(item => item.space)
        .reduce((acc, curr) => acc + curr, 0);

    const renderCells = () => (
        items.map((item, index) => (
            <div key={index} className="w-10 h-10 border-2 border-zinc-900">
                <img
                    src={sprites[item.name]}
                    alt="img"
                    className="w-8 h-8"
                />
            </div>
        ))
    )

    return (
        <div className="flex flex-col gap-6">
            <p>Capacidade máxima: {capacity}</p>

            <div className="flex flex-col">
                <p>Itens escolhidos:</p>
                <div className="w-20 grid grid-cols-2 gap-0">
                    {renderCells()}
                </div>
                <p>Capacidade atingida: {filled}</p>
                <p>Lucro: {profit}</p>
            </div>
        </div>
    )
}