import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { POKEMONS } from 'constants/Pokemons';
import { Pokemons, Pokemon, PokemonInfo, PokemonType, PokemonsByType } from 'types/Pokemons';
import { RootState } from '.';

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
    name: POKEMONS,
    initialState: initialPokemonsState,
    reducers: {
        updatePokemons(state: Pokemons, action: PayloadAction<Array<Pokemon>>) {
            state.allpokemons = action.payload;
        },
        updatePokemonInfo(state: Pokemons, action: PayloadAction<PokemonInfo>) {
            state.pokemonInfo = action.payload;
        },
        updatePokemonType(state: Pokemons, action: PayloadAction<PokemonType>) {
            state.pokemonType.typeName = action.payload.typeName;
            state.pokemonType.typeUrl = action.payload.typeUrl;
        },
        updatePokemonsByType(state: Pokemons, action: PayloadAction<Array<PokemonsByType>>) {
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

const selectPokemons = (state: RootState) => state.pokemons;

export const selectAllPokemons = createSelector(selectPokemons, (state: Pokemons) => state.allpokemons);
export const selectPokemonType = createSelector(selectPokemons, (state: Pokemons) => state.pokemonType);
export const selectPokemonsByType = createSelector(selectPokemons, (state: Pokemons) => state.pokemonsByType);
export const selectPokemonInfo = createSelector(selectPokemons, (state: Pokemons) => state.pokemonInfo);
