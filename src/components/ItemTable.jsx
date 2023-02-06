import React from "react";
import { sprites, items } from "../utils/tileTypes";

export function ItemTable() {
    const renderRows = () => (
        items.map((item, index) => (
            <tr key={index} className="font-medium text-lg">
                <td>
                    <img
                        src={sprites[item.name]}
                        alt="img"
                        className="w-8 h-8"
                    />
                </td>
                <td>{item.space}</td>
                <td>{item.price}</td>
            </tr>
        ))
    )

    return (
        <div className="w-52">
            <table className="w-full border-2 border-zinc-900">
                <thead className="bg-zinc-900 gap-4 text-white font-medium text-lg">
                    <tr>
                        <td>Item</td>
                        <td>Tamanho</td>
                        <td>Valor</td>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        </div>
    )
}
