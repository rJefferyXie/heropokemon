// Interfaces
import ShopItem from '../interfaces/ShopItem';

const ShopItems: ShopItem[] = [
  {
    id: "potion1",
    name: "Potion",
    cost: 10,
    image: "/images/items/potion1.webp",
    description: "Heal a pokemon by 20 hitpoints."
  },
  {
    id: "potion2",
    name: "Super Potion",
    cost: 50,
    image: "/images/items/potion2.png",
    description: "Heal a pokemon by 50 hitpoints."
  },
  {
    id: "potion3",
    name: "Hyper Potion",
    cost: 200,
    image: "/images/items/potion3.png",
    description: "Heal a pokemon by 120 hitpoints."
  },
  {
    id: "potion4",
    name: "Max Potion",
    cost: 750,
    image: "/images/items/potion4.png",
    description: "Fully heal a pokemon's hitpoints."
  },
  // {
  //   id: "hp",
  //   name: "HP Up",
  //   cost: 3000,
  //   image: "/images/items/hpUp.webp",
  //   description: "Raise a pokemon's HP stat by 1."
  // },
  // {
  //   id: "protein",
  //   name: "Protein",
  //   cost: 3000,
  //   image: "/images/items/protein.webp",
  //   description: "Raise a pokemon's attack stat by 1."
  // },
  // {
  //   id: "iron",
  //   name: "Iron",
  //   cost: 3000,
  //   image: "/images/items/iron.webp",
  //   description: "Raise a pokemon's defense stat by 1."
  // },
  // {
  //   id: "calcium",
  //   name: "Calcium",
  //   cost: 3000,
  //   image: "/images/items/calcium.webp",
  //   description: "Raise a pokemon's special attack stat by 1."
  // },
  // {
  //   id: "zinc",
  //   name: "Zinc",
  //   cost: 3000,
  //   image: "/images/items/zinc.webp",
  //   description: "Raise a pokemon's special defense stat by 1."
  // },
  // {
  //   id: "carbos",
  //   name: "Carbos",
  //   cost: 3000,
  //   image: "/images/items/carbos.webp",
  //   description: "Raise a pokemon's speed stat by 1."
  // },
  // {
  //   id: "rareCandy",
  //   name: "Rare Candy",
  //   cost: 7777,
  //   image: "/images/items/rareCandy.webp",
  //   description: "Raise a pokemon's level by 1."
  // }
]

export default ShopItems;