import axios from 'axios';
import { DEFAULT_API_URL } from 'constants/Pokemons';

export const getPokemons = (quantity: number) => {
    return axios.get(`${DEFAULT_API_URL}pokemon?limit=${quantity}`);
};