export const farms = [
  {
    slug: "haor",
    title: "Haor Farm",
    description: "Farming with water, seasonality and wetland knowledge.",
    intro:
      "Haor farming is shaped by seasonal water, fertile wetlands and community knowledge. This page highlights resilient farm practices and locally rooted food systems from Bangladesh’s haor landscapes.",
    cards: ["Water-smart cultivation", "Seasonal crop planning", "Wetland-friendly production", "Local producer knowledge"],
  },
  {
    slug: "drought",
    title: "Drought Farm",
    description: "Growing with less water through practical, resilient farming.",
    intro:
      "Drought Farm focuses on farming approaches that respond to dry conditions, protect soil moisture and support dependable local food production through careful resource use.",
    cards: ["Water-efficient practices", "Soil moisture care", "Crop diversification", "Climate-aware planning"],
  },
  {
    slug: "coast",
    title: "Coast Farm",
    description: "Food production shaped by salinity, tides and coastal resilience.",
    intro:
      "Coast Farm presents coastal agriculture through the lens of resilient livelihoods, salt-aware production and locally appropriate practices for communities living close to the sea.",
    cards: ["Salinity-aware farming", "Coastal crop choices", "Soil and water stewardship", "Resilient livelihoods"],
  },
  {
    slug: "hill",
    title: "Hill Farm",
    description: "Terrace, soil and landscape stewardship for hill communities.",
    intro:
      "Hill Farm celebrates farming systems that work with slopes and local landscapes while protecting soil, supporting biodiversity and connecting producers with responsible markets.",
    cards: ["Slope-sensitive cultivation", "Soil conservation", "Diverse hill crops", "Local knowledge"],
  },
  {
    slug: "flood",
    title: "Flood Farm",
    description: "Adapting farm production to recurring flood conditions.",
    intro:
      "Flood Farm explores production approaches designed around changing water levels, recovery after flooding and the practical knowledge farmers use to protect food and livelihoods.",
    cards: ["Flood-aware planning", "Resilient crop systems", "Recovery and regeneration", "Community adaptation"],
  },
] as const;

export function getFarm(slug: string) {
  return farms.find((farm) => farm.slug === slug);
}
