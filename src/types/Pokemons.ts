export type AllPokemons = {
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

export type Pokemons = {
    allpokemons: Array<AllPokemons>
    pokemonInfo: PokemonInfo,
    pokemonType: { typeName: string | null, typeUrl: string | null},
    pokemonsByType: Array<{[key: string]: { name: string, url: string}}>,
};