import React, { useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import  { getPokemons } from 'API';
import { getPokemonsByType } from 'API';
import { AllPokemons, AutocompleteSelect } from 'components';
import { useAppSelector, useAppDispatch } from "store";
import {
    updatePokemons,
    updatePokemonsByType,
    selectAllPokemons,
    selectPokemonType,
    selectPokemonsByType,
} from 'store/pokemons';
import { Pokemon } from 'types/Pokemons';

import styles from './Pokemons.module.scss';

const Pokemons:React.FC = () => {
    const dispatch = useAppDispatch();
    const pokemonPortView = useRef<HTMLDivElement>(null);
    const allPokemons: Pokemon[] = useAppSelector(selectAllPokemons);
    const typeUrl: string | null = useAppSelector(selectPokemonType).typeUrl;
    const typeName: string | null = useAppSelector(selectPokemonType).typeName;
    const pokemonsByType: Array<{[key: string]: { name: string, url: string}}> = useAppSelector(selectPokemonsByType);

    useEffect(() => {
        pokemonPortView.current?.scrollTo(0, 0);
    }, [pokemonsByType]);

    useEffect(() => {
        typeUrl && getPokemonsByType(typeUrl)
            .then(res => dispatch(updatePokemonsByType(res.data.pokemon)));
    }, [typeUrl]);

    useEffect(() => {
        getPokemons(100)
            .then(res => dispatch(updatePokemons(res.data.results)));
    }, []);

    const renderPokemonsByType = useCallback((): Array<React.ReactElement> => {
        return pokemonsByType.map((item: {[key: string]: Pokemon}) => {
            return (
                <div className={styles.pokemonsByType} key={item.pokemon.url}>
                    <Link to={`/${item.pokemon.name}`} className={styles.pokemon}>{item.pokemon.name}</Link>
                </div>
            );
        });
    }, [pokemonsByType]);
     
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.mainBlock}>
                <div className={styles.selectsBlock}>
                    <AutocompleteSelect 
                        options={allPokemons}
                        placeholder="Enter the pokemon's name..."
                        noOptionsText="There is no such Pokemon"
                    />
                    <AutocompleteSelect 
                        fetchWhenOpen
                        placeholder="Enter the pokemon's type..."
                        noOptionsText="There is no such type"
                    />
                </div>
                {typeUrl 
                    ? <div className={styles.pokemonByTypeTitleWrapper} ref={pokemonPortView}>
                        <div className={styles.pokemonsByTypeTitle}>Result for: <div className={styles.typeName}>{typeName}</div></div>
                        {renderPokemonsByType()}
                    </div>
                    : <AllPokemons pokemons={allPokemons} />}
            </div>
        </div>
    );
};

export default Pokemons;