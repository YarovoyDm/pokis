import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { AllPokemons } from 'types/Pokemons';

import styles from './SearchPokemonByName.module.scss';

type Props = {
    pokemons: Array<AllPokemons>,
    noOptionsText?: string,
    placeholder?: string,
};

const SearchPokemonByName:React.FC<Props> = ({
    pokemons,
    noOptionsText,
    placeholder,
}) => {
    const navigate = useNavigate();

    return (
        <Autocomplete
            noOptionsText={noOptionsText || "No Options"}
            onChange={(event: React.SyntheticEvent<Element, Event>, pokemonName: string | null) => {
                navigate(`/${pokemonName}`);
            }}
            options={pokemons && pokemons.map(({ name }:{ name: string }) => name)}
            renderInput={(params) => <TextField {...params} label={placeholder || "Type something..."} />}
            className={styles.search}
        />
    );
};

export default SearchPokemonByName;