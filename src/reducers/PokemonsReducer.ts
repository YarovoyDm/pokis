import { createSlice } from '@reduxjs/toolkit';
import { Pokemons } from '../types/Pokemons';

const initialPokemonsState = {
    allpokemons: [],
    pokemonInfo: {
        moves: [],
        sprites: {
            
        },
        name: '',
        types: [],
    },
    pokemonType: {
        typeName: '',
        typeUrl: '',
    },
    pokemonsByType: [],
} as Pokemons;

const pokemonsSlice = createSlice({
    name: 'pokemons',
    initialState: initialPokemonsState,
    reducers: {
        updatePokemons(state: Pokemons, action) {
            state.allpokemons = action.payload;
        },
        updatePokemonInfo(state: Pokemons, action) {
            state.pokemonInfo = action.payload;
        },
        updatePokemonType(state: Pokemons, action) {
            state.pokemonType.typeName = action.payload.typeName;
            state.pokemonType.typeUrl = action.payload.typeUrl;
        },
        updatePokemonsByType(state: Pokemons, action) {
            state.pokemonsByType = action.payload;
        },
    },
});

export default pokemonsSlice.reducer;
export const {
    updatePokemons,
    updatePokemonInfo,
    updatePokemonType,
    updatePokemonsByType,
} = pokemonsSlice.actions;