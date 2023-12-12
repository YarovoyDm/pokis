import axios from 'axios';

export const getPokemonsByType = (typeUrl: string | null) => {
    return axios.get(`${typeUrl}`);
};