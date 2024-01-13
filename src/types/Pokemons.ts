export type Pokemon = {
    name: string,
    url: string,
};

export type PokemonTypes = {
    id: string,
    type: {
        name: string,
        url: string,
    },
};

export type PokemonType = {
    typeName: string | null, typeUrl: string | null
}

export type Moves = {
    move: {
        name: string, url: string
    },
    key: string,
};

export type AllTypes = {
    name: string,
    url: string,
};

export type PokemonInfo = {
    moves: Array<Moves>,
    name: string,
    types: Array<PokemonTypes>,
    sprites: { [key : string]: string },
};

export type PokemonsByType = {
    [key: string]: AllTypes,
};

export type Pokemons = {
    allpokemons: Array<Pokemon>
    pokemonInfo: PokemonInfo,
    pokemonType: PokemonType,
    pokemonsByType: Array<PokemonsByType>,
};

