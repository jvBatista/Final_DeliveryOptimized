import flowers from '../assets/tiles/flowers.png';
import rock from '../assets/tiles/rock.png';
import floor from '../assets/tiles/floor.png';
import sticks from '../assets/tiles/sticks.png';
import tree from '../assets/tiles/tree.png';
import berry from '../assets/items/berry.png';
import evo_stone from '../assets/items/evo_stone.png';
import fossil from '../assets/items/fossil.png';
import greatball from '../assets/items/greatball.png';
import mega_stone from '../assets/items/mega_stone.png';
import potion from '../assets/items/potion.png';
import tm from '../assets/items/tm.png';

export const types = [
    "floor",
    "tree",
    "flowers",
    "sticks",
    "rock",
    "berry",
    "evo_stone",
    "fossil",
    "greatball",
    "mega_stone",
    "potion",
    "tm",
]

export const sprites = {
    "floor": floor,
    "tree": tree,
    "flowers": flowers,
    "sticks": sticks,
    "rock": rock,
    "berry": berry,
    "evo_stone": evo_stone,
    "fossil": fossil,
    "greatball": greatball,
    "mega_stone": mega_stone,
    "potion": potion,
    "tm": tm,
}

export const tileWeights = {
    "floor": 1,
    "flowers": 2,
    "sticks": 3,
    "rock": 5
}

export const items = [
    {
        name: "berry",
        space: 30,
        price: 40
    },
    {
        name: "evo_stone",
        space: 150,
        price: 400
    },
    {
        name: "fossil",
        space: 250,
        price: 500
    },
    {
        name: "greatball",
        space: 75,
        price: 250
    },
    {
        name: "mega_stone",
        space: 20,
        price: 750
    },
    {
        name: "potion",
        space: 100,
        price: 100
    },
    {
        name: "tm",
        space: 25,
        price: 200
    },
]