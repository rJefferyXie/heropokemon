interface Ability {
  id: string,
  cost: Function,
  name: Function,
  image: string,
  unlocked?: boolean,
  description: Function
}

export default Ability;