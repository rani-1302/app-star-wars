export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[]; // URLs to character resources
  planets: string[]; // URLs to planet resources
  starships: string[]; // URLs to starship resources
  vehicles: string[]; // URLs to vehicle resources
  species: string[]; // URLs to species resources
  created: string;
  edited: string;
  url: string; // URL to the film resource
}

export interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[]; // URLs to character resources
  films: string[]; // URLs to film resources
  created: string;
  edited: string;
  url: string; // URL to the starship resource
}
export interface Character {
  name: string;
  url: string;
  gender: string;
  homeworld: string;
  films: string[];
  hair_color: string;
  eye_color: string;
  height: string;
  starships: string[];
}

export interface FetchedData {
  count: number;
  results: Character[];
}
