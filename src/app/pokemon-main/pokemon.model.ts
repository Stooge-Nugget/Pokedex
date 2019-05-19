// Move models into more local file scopes.

export interface PokemonQuery {
  count: number;
  next: string;
  previous: string;
  results: PokemonResult[];
}

export interface PokemonResult {
  name: string;
  url: string;
}

export interface Pokemon {
  abilities: any[];
  base_experience: number;
  forms: any[];
  game_indices: any[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: any[];
  name: string;
  order: number;
  species: PokemonSpecies;
  sprites: Sprites;
  stats: any[];
  types: PokemonTypes[];
  weight: 69;
}

export interface PokemonTypes {
  slot: number;
  type: PokemonType;
}

export interface PokemonType {
  name: string;
  url: string;
}

export interface Species {
  base_happiness: number;
  capture_rate: number;
  color: any;
  egg_groups: any[];
  evolution_chain: any;
  evolves_from_species: any;
  flavor_text_entries: any[];
  form_descriptions: any[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: any[];
  generation: any;
  growth_rate: any;
  habitat: any;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  name: string;
  names: any[];
  order: number;
  pal_park_encounters: any[];
  pokedex_numbers: any[];
  shape: any;
  varieties: any[];
}

export interface EvolutionChain {
  id: number;
  name: string;
  sprite: string;
}

export interface Stat extends statBase {
  icon: string;
  iconText: string;
}

interface statBase {
  name: string;
  baseStat: number;
  effort: number;
}

interface PokemonSpecies {
  name: string;
  url: string;
}

interface Sprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export enum StatNameDataMap {
  Speed = 'speed',
  SpecialDefense = 'special-defense',
  SpecialAttack = 'special-attack',
  Defense = 'defense',
  Attack = 'attack',
  HealthPoints = 'hp'
}

export enum StatName {
  Speed = 'Speed',
  SpecialDefense = 'Special Defense',
  SpecialAttack = 'Special Attack',
  Defense = 'Defense',
  Attack = 'Attack',
  HealthPoints = 'Health Points'
}

export const StatIcons = {
  Speed: { icon: 'speed-icon.svg', iconText: StatName.Speed },
  SpecialDefense: {
    icon: 'sp-defense-icon.svg',
    iconText: StatName.SpecialDefense
  },
  SpecialAttack: {
    icon: 'sp-attack-icon.svg',
    iconText: StatName.SpecialAttack
  },
  Defense: { icon: 'defense-icon.svg', iconText: StatName.Defense },
  Attack: { icon: 'attack-icon.svg', iconText: StatName.Attack },
  HealthPoints: { icon: 'health-icon.svg', iconText: StatName.HealthPoints }
};

export function getTypeColour(type: PokemonType): string {
  switch (type.name) {
    case 'grass':
      return '#78C850';
    case 'poison':
      return '#A040A0';
    case 'fire':
      return '#F08030';
    case 'water':
      return '#6890F0';
    case 'bug':
      return '#A8B820';
    case 'flying':
      return '#A890F0';
    case 'normal':
      return '#A8A878';
    case 'electric':
      return '#F8D030';
    case 'fairy':
      return '#EE99AC';
    case 'fighting':
      return '#C03028';
    case 'steel':
      return '#B8B8CF';
    case 'ground':
      return '#E0C068';
    case 'psychic':
      return '#F85888';
    case 'rock':
      return '#B8A038';
    case 'ghost':
      return '#705898';
    case 'ice':
      return '#98D8D8';
    case 'dragon':
      return '#7038F8';
    case 'dark':
      return '#705848';
    default:
      return '#333333';
  }
}
