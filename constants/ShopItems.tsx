// Interfaces
import ShopItem from '../interfaces/ShopItem';

const ShopItems: ShopItem[] = [
  {
    id: "potion1",
    name: "Potion",
    cost: 100,
    image: "images/potion1.webp",
    description: "Heal a pokemon by 20 hitpoints."
  },
  {
    id: "potion2",
    name: "Super Potion",
    cost: 500,
    image: "images/potion2.png",
    description: "Heal a pokemon by 50 hitpoints."
  },
  {
    id: "potion3",
    name: "Hyper Potion",
    cost: 2500,
    image: "images/potion3.png",
    description: "Heal a pokemon by 120 hitpoints."
  },
  {
    id: "potion4",
    name: "Max Potion",
    cost: 5000,
    image: "images/potion4.png",
    description: "Fully heal a pokemon's hitpoints."
  },
  {
    id: "hp",
    name: "HP Up",
    cost: 10000,
    image: "images/hpUp.webp",
    description: "Raise a pokemon's HP stat by 1."
  },
  {
    id: "protein",
    name: "Protein",
    cost: 10000,
    image: "images/protein.webp",
    description: "Raise a pokemon's attack stat by 1."
  },
  {
    id: "iron",
    name: "Iron",
    cost: 10000,
    image: "images/iron.webp",
    description: "Raise a pokemon's defense stat by 1."
  },
  {
    id: "calcium",
    name: "Calcium",
    cost: 10000,
    image: "images/calcium.webp",
    description: "Raise a pokemon's special attack stat by 1."
  },
  {
    id: "zinc",
    name: "Zinc",
    cost: 10000,
    image: "images/zinc.webp",
    description: "Raise a pokemon's special defense stat by 1."
  },
  {
    id: "carbos",
    name: "Carbos",
    cost: 10000,
    image: "images/carbos.webp",
    description: "Raise a pokemon's speed stat by 1."
  },
  {
    id: "rareCandy",
    name: "Rare Candy",
    cost: 25000,
    image: "images/rareCandy.webp",
    description: "Raise a pokemon's level by 1."
  }
]

export default ShopItems;