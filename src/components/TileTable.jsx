import React from "react";
import { sprites, tileWeights } from "../utils/tileTypes";

export function TileTable() {
    const renderRows = () => (
        Object.keys(tileWeights).map((tile, index) => (
            <tr key={index} className="font-medium text-lg">
                <td>
                    <img
                        src={sprites[tile]}
                        alt="img"
                        className="w-8 h-8"
                    />
                </td>
                <td className="flex justify-center items-center">{tileWeights[tile]}</td>
            </tr>
        ))
    )

    return (
        <div className="w-full">
            <table className="w-full border-2 border-zinc-900">
                <thead className="bg-zinc-900 gap-4 text-white font-medium text-lg">
                    <tr>
                        <td>Tile</td>
                        <td>Dificuldade</td>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        </div>
    )
}
