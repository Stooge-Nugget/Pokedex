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
    abilities: [];
    base_experience: number;
    forms: [];
    game_indices: [];
    height: number;
    held_items: [];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: [];
    name: string;
    order: number;
    species: PokemonSpecies;
    sprites: Sprites;
    stats: [];
    types: PokemonTypes[];
    weight: 69
}

export interface PokemonTypes {
    slot: number;
    type: PokemonType;
}

export interface PokemonType {
    name: string
    url: string;
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