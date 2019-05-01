export interface pokemonQuery {
    count: number;
    next: string;
    previous: string;
    results: pokemonResult[];
}

export interface pokemonResult {
    name: string;
    url: string;
}

export interface pokemon {
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
    species: species;
    sprites: sprites;
    stats: [];
    types: types[];
    weight: 69
}

export interface types {
    slot: number;
    type: type;
}

export interface type {
    name: string
    url: string;
}

interface species {
    name: string;
    url: string;
}

interface sprites {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
}