import axios from 'axios';
import { DEFAULT_API_URL } from 'constants/Pokemons';
import { PokemonInfo } from 'types/Pokemons';

export const getPokemonInfo = (pokemonName: string) => {
    return axios.get<PokemonInfo>(`${DEFAULT_API_URL}pokemon/${pokemonName}/`);
};
