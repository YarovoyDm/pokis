import axios from 'axios';
import { PokemonsByType } from 'types/Pokemons';

type Response =  {
    pokemon: Array<PokemonsByType>,
}

export const getPokemonsByType = (typeUrl: string | null) => {
    return axios.get<Response>(`${typeUrl}`);
};