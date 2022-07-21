// Interfaces
import Ability from '../interfaces/Ability';

// Constants
import AbilityLevels from './AbilityLevels';

const Abilities: Ability[] = [
  {
    id: "regeneration",
    name: (level: number) => {
      return "Regeneration " + AbilityLevels[level];
    },
    level: 0,
    cost: (level: number) => {
      return level ** 2 + 2
    },
    image: "/images/lightBall.webp",
    description: (level: number) => {
      return `Pokemon on your team with more than 0 HP will regenerate ${level ** 2} HP per second.`;
    }
  },
  {
    id: "kindSoul",
    name: (level: number) => {
      return "Kind Soul " + AbilityLevels[level];
    },
    level: 0,
    cost: (level: number) => {
      return level ** 2 + 2
    },
    image: "/images/heartScale.webp",
    description: (level: number) => {
      return `All wild pokemon are ${level * 10}% more likely to join your team.`;
    }
  },
  {
    id: "vigor",
    name: (level: number) => {
      return "Vigor " + AbilityLevels[level];
    },
    level: 0,
    cost: (level: number) => {
      return level ** 2 + 2
    },
    image: "/images/deepSeaTooth.webp",
    description: (level: number) => {
      return `Your pokemon deal ${level * 10}% more damage.`;
    }
  },
  {
    id: "strongStyle",
    name: (level: number) => {
      return "Strong Style " + AbilityLevels[level];
    },
    level: 0,
    cost: (level: number) => {
      return level ** 2 + 2
    },
    image: "/images/blackBelt.webp",
    description: (level: number) => {
      return `Your clicks deal ${level ** 2 + 1} damage to wild pokemon.`;
    }
  },
  {
    id: "fortune",
    name: (level: number) => {
      return "Fortune " + AbilityLevels[level];
    },
    level: 0,
    cost: (level: number) => {
      return level ** 2 + 2
    },
    image: "/images/amuletCoin.webp",
    description: (level: number) => {
      return `Wild pokemon drop ${level * 10}% more currency.`;
    }
  },
  {
    id: "mysteryBall",
    name: (_: any) => {
      return "Mystery Ball"
    },
    level: -1,
    cost: (_: any) => {
      return 7;
    },
    image: "/images/pokeball.webp",
    description: (_: any) => {
      return "Adds a random and unique pokemon to your team or storage.";
    }
  },
  {
    id: "swapper",
    name: (_: any) => {
      return "Auto Swapper"
    },
    level: -1,
    cost: (_: any) => {
      return 20;
    },
    image: "/images/lustrousOrb.webp",
    description: (_: any) => {
      return "Pokemon on your team will be swapped to the first slot automatically.";
    } 
  },
  {
    id: "healer",
    name: (_: any) => {
      return "Auto Healer";
    },
    level: -1,
    cost: (_: any) => {
      return 20;
    },
    image: "/images/soulDew.png",
    description: (_: any) => {
      return "Automatically uses your potions on your pokemon when their health gets low.";
    }
  }
]

export default Abilities;