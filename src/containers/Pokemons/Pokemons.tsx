import React, { useEffect, useCallback } from 'react';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from "reducers";
import  { getPokemons } from 'API';
import { getPokemonsByType } from 'API';
import { PokemonTypesSelect, SearchPokemonByName, PokemonsTable } from 'components';
import {
    updatePokemons,
    updatePokemonsByType,
    selectAllPokemons,
    selectPokemonType,
    selectPokemonsByType,
} from 'reducers/PokemonsReducer';

import styles from './Pokemons.module.scss';

const Pokemons:React.FC = () => {
    const dispatch = useAppDispatch();

    const allPokemons = useAppSelector(selectAllPokemons);
    const typeUrl = useAppSelector(selectPokemonType).typeUrl;
    const typeName = useAppSelector(selectPokemonType).typeName;
    const pokemonsByType = useAppSelector(selectPokemonsByType);

    useEffect(() => {
        typeUrl && getPokemonsByType(typeUrl).then(res => dispatch(updatePokemonsByType(res.data.pokemon)));
    }, [typeUrl]);

    useEffect(() => {
        getPokemons(100)
            .then(res => dispatch(updatePokemons(res.data.results)));
    }, []);

    const renderPokimonsByType = useCallback(() => {
        return pokemonsByType.map(item => {
            return (
                <div className={styles.pokemonsByType} key={item.pokemon.url}>
                    <Link to={`/${item.pokemon.name}`}>{item.pokemon.name}</Link>
                </div>
            );
        });
    }, [pokemonsByType]);
     
    return (
        <div>
            <Paper sx={{ width: '50%', marginLeft: '25%' }}>
                <SearchPokemonByName 
                    pokemons={allPokemons}
                    placeholder="Enter the pokemon's name..."
                    noOptionsText="There is no such Pokemon"
                />
                <PokemonTypesSelect 
                    placeholder="Enter the pokemon's type..."
                    noOptionsText="There is no such type"
                />
                {typeUrl 
                    ? <div className={styles.pokemonByTypeTitleWrapper}>
                        <div className={styles.pokemonsByTypeTitle}>Result for: {typeName}</div>
                        {renderPokimonsByType()}
                    </div>
                    : <PokemonsTable pokemons={allPokemons} />}
            </Paper>
        </div>
    );
};

export default Pokemons;