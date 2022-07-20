const experienceForLevel = (level: number) => {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += Math.floor(i + 300 * Math.pow(2, i / 7.0));
  }

  return Math.floor(total / 4);
}

export default experienceForLevel;