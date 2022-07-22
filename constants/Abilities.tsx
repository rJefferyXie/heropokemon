// Interfaces
import Ability from '../interfaces/Ability';

// Constants
import AbilityLevels from './AbilityLevels';

const Abilities: Ability[] = [
  {
    id: "regeneration",
    image: "/images/lightBall.webp",
    name: (level: number) => {
      return "Regeneration " + AbilityLevels[level];
    },
    cost: (level: number) => {
      return Math.max(2, level ** 2)
    },
    description: (level: number) => {
      return `Pokemon on your team with more than 0 HP will regenerate ${(level * 2) / 10} HP per second.`;
    }
  },
  {
    id: "kindSoul",
    image: "/images/heartScale.webp",
    name: (level: number) => {
      return "Kind Soul " + AbilityLevels[level];
    },
    cost: (level: number) => {
      return Math.max(2, level ** 2)
    },
    description: (level: number) => {
      return `All wild pokemon are ${level * 10}% more likely to join your team.`;
    }
  },
  {
    id: "vigor",
    image: "/images/deepSeaTooth.webp",
    name: (level: number) => {
      return "Vigor " + AbilityLevels[level];
    },
    cost: (level: number) => {
      return Math.max(2, level ** 2)
    },
    description: (level: number) => {
      return `Your pokemon deal ${level * 10}% more damage.`;
    }
  },
  {
    id: "strongStyle",
    image: "/images/blackBelt.webp",
    name: (level: number) => {
      return "Strong Style " + AbilityLevels[level];
    },
    cost: (level: number) => {
      return Math.max(2, level ** 2)
    },
    description: (level: number) => {
      return `Your clicks deal ${(level ** 2) + 1} damage to wild pokemon.`;
    }
  },
  {
    id: "fortune",
    image: "/images/amuletCoin.webp",
    name: (level: number) => {
      return "Fortune " + AbilityLevels[level];
    },
    cost: (level: number) => {
      return Math.max(2, level ** 2)
    },
    description: (level: number) => {
      return `Wild pokemon drop ${level * 10}% more currency.`;
    }
  },
  {
    id: "mysteryBall",
    image: "/images/pokeball.webp",
    name: (_: any) => {
      return "Mystery Ball"
    },
    cost: (_: any) => {
      return 7;
    },
    description: (_: any) => {
      return "Adds a random and unique pokemon to your team or storage.";
    }
  },
  {
    id: "swapper",
    image: "/images/lustrousOrb.webp",
    name: (_: any) => {
      return "Auto Swapper"
    },
    cost: (_: any) => {
      return 10;
    },
    description: (_: any) => {
      return "Pokemon on your team will be swapped to the first slot automatically.";
    } 
  },
  {
    id: "healer",
    image: "/images/soulDew.png",
    name: (_: any) => {
      return "Auto Healer";
    },
    cost: (_: any) => {
      return 10;
    },
    description: (_: any) => {
      return "Automatically uses your potions on your pokemon when their health gets low.";
    }
  }
]

export default Abilities;