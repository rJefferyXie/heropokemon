// Interfaces
import Ability from '../interfaces/Ability';

const Abilities: Ability[] = [
  {
    id: "regeneration",
    name: "Regeneration I",
    level: 0,
    cost: 1,
    image: "/images/lightBall.webp",
    description: "Pokemon on your team with more than 0 HP will regenerate 1 HP per second."
  },
  {
    id: "kindSoul",
    name: "Kind Soul I",
    level: 0,
    cost: 1,
    image: "/images/heartScale.webp",
    description: "All wild pokemon are 10% more likely to join your team."
  },
  {
    id: "vigor",
    name: "Vigor I",
    level: 0,
    cost: 1,
    image: "/images/deepSeaTooth.webp",
    description: "Your pokemon deal 10% more damage."
  },
  {
    id: "strongStyle",
    name: "Strong Style I",
    level: 0,
    cost: 1,
    image: "/images/blackBelt.webp",
    description: "Your clicks now deal 2 damage."
  },
  {
    id: "fortune",
    name: "Fortune I",
    level: 0,
    cost: 1,
    image: "/images/amuletCoin.webp",
    description: "Wild pokemon drop 10% more currency."
  },
  {
    id: "mysteryBall",
    name: "Mystery Ball",
    cost: 3,
    image: "/images/pokeball.webp",
    description: "Adds a random and unique pokemon to your team."
  },
  {
    id: "swapper",
    name: "Auto Swapper",
    cost: 10,
    image: "/images/lustrousOrb.webp",
    description: "Pokemon on your team will be swapped to the first slot automatically."
  },
  {
    id: "healer",
    name: "Auto Healer",
    cost: 10,
    image: "/images/soulDew.png",
    description: "Automatically uses your potions on your pokemon when they are low on HP."
  },
]

export default Abilities;