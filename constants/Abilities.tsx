// Interfaces
import Ability from '../interfaces/Ability';

// Constants
import AbilityLevels from './AbilityLevels';

const Abilities: Ability[] = [
  {
    id: "regeneration",
    image: "/images/abilities/lightBall.webp",
    name: (level: number) => {
      return "Regeneration " + AbilityLevels[level];
    },
    cost: (level: number) => {
      return Math.max(1, Math.floor(level ** 1.4))
    },
    description: (level: number) => {
      return `Pokemon on your team with more than 0 HP will regenerate ${(level * 2) / 10} HP per second.`;
    }
  },
  {
    id: "kindSoul",
    image: "/images/abilities/heartScale.webp",
    name: (level: number) => {
      return "Kind Soul " + AbilityLevels[level];
    },
    cost: (level: number) => {
      return Math.max(1, Math.floor(level ** 1.4))
    },
    description: (level: number) => {
      return `All wild pokemon are ${level * 10}% more likely to join your team.`;
    }
  },
  {
    id: "vigor",
    image: "/images/abilities/deepSeaTooth.webp",
    name: (level: number) => {
      return "Vigor " + AbilityLevels[level];
    },
    cost: (level: number) => {
      return Math.max(1, Math.floor(level ** 1.4))
    },
    description: (level: number) => {
      return `Your pokemon deal ${level * 10}% more damage.`;
    }
  },
  {
    id: "strongStyle",
    image: "/images/abilities/blackBelt.webp",
    name: (level: number) => {
      return "Strong Style " + AbilityLevels[level];
    },
    cost: (level: number) => {
      return Math.max(1, Math.floor(level ** 1.4))
    },
    description: (level: number) => {
      return `Your clicks deal ${(level ** 2) + 1} damage to wild pokemon.`;
    }
  },
  {
    id: "fortune",
    image: "/images/abilities/amuletCoin.webp",
    name: (level: number) => {
      return "Fortune " + AbilityLevels[level];
    },
    cost: (level: number) => {
      return Math.max(1, Math.floor(level ** 1.4))
    },
    description: (level: number) => {
      return `Wild pokemon drop ${level * 10}% more currency.`;
    }
  },
  {
    id: "swapper",
    image: "/images/abilities/lustrousOrb.webp",
    name: (_: any) => {
      return "Auto Swapper"
    },
    cost: (_: any) => {
      return 5;
    },
    description: (_: any) => {
      return "Pokemon on your team will be swapped to the first slot automatically.";
    } 
  },
  {
    id: "healer",
    image: "/images/abilities/soulDew.png",
    name: (_: any) => {
      return "Auto Healer";
    },
    cost: (_: any) => {
      return 3;
    },
    description: (_: any) => {
      return "Automatically uses your potions on your pokemon when their health gets low.";
    }
  }
]

export default Abilities;