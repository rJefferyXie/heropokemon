interface RegionMap {
  [key: string]: string;
}

const RegionColorSchemes: RegionMap = {
  'kanto': "rgba(215, 0, 0, 0.5)",
  'johto': "rgba(235, 165, 0, 0.5)",
  'hoenn': "rgba(215, 215, 0, 0.5)",
  'sinnoh': "rgba(0, 155, 0, 0.5)",
  'unova': "rgba(0, 0, 155, 0.5",
  'kalos': "rgba(75, 0, 130, 0.5)",
  'alola': "rgba(168, 100, 168, 0.5)"
}

export default RegionColorSchemes;