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
    cost: 250,
    image: "images/potion2.png",
    description: "Heal a pokemon by 50 hitpoints."
  },
  {
    id: "potion3",
    name: "Hyper Potion",
    cost: 500,
    image: "images/potion3.png",
    description: "Heal a pokemon by 120 hitpoints."
  },
  {
    id: "potion4",
    name: "Max Potion",
    cost: 1000,
    image: "images/potion4.png",
    description: "Fully heal a pokemon's hitpoints."
  }
]

export default ShopItems;