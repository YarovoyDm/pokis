import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers";
import {
    updatePokemonInfo,
    updatePokemonType,
    selectPokemonInfo,
} from 'reducers/PokemonsReducer';
import { Moves, PokemonTypes } from 'types/Pokemons';
import { getPokemonInfo } from 'API';

import styles from './Pokemon.module.scss';

const Pokemon:React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { pokemonName } = useParams();
    const pokemonInfo = useAppSelector(selectPokemonInfo);

    const [isLoading, setIsloading] = useState(true);

    useEffect(() => {
        pokemonName && getPokemonInfo(pokemonName).then(res => {
            dispatch(updatePokemonInfo(res.data));
            setIsloading(false);
        });
    }, [pokemonName]);

    const { types, name, moves, sprites } = pokemonInfo;
    const pokemonAvatar = useMemo(() => "url("+ `${sprites && sprites.front_default}` +")", [sprites]);

    const typesRender = useCallback(() => {
        const onTypeClick = (data: PokemonTypes) => {
            const dataForSaving = {
                typeName: data.type.name,
                typeUrl: data.type.url,
            };
    
            dispatch(updatePokemonType(dataForSaving));
            navigate('/');
        };

        return types && types.map((item: PokemonTypes) => {
            return <div key={item.id} className={styles.pokemonType} onClick={() => onTypeClick(item)}>{item.type.name}</div>;
        });
    }, [types]);

    const movesRender = useCallback(() => {
        return moves && moves.map((item: Moves) => {
            return <div className={styles.move} key={item.move.url}>{item.move.name}</div>;
        });
    }, [moves]);

    if(isLoading) {
        return <div className={styles.loading}>Loading...</div>;
    };

    return (
        <div className={styles.pageWrapper}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>Go back</button>
            <div className={styles.pokemonDescription}>
                <div className={styles.pokemonInformation}>
                    <div className={styles.pokemonAvatar} style={{ backgroundImage: pokemonAvatar }} />
                    <div className={styles.pokemonName}>
                        {name}
                    </div>
                </div>
                <div className={styles.pokemonMoves}>
                    <div className={styles.title}>Moves</div>
                    <div className={styles.content}>{movesRender()}</div>
                </div>
                <div className={styles.pokemonTypes}>
                    <div className={styles.title}>Types</div>
                    <div className={styles.content}>{typesRender()}</div>
                </div>
            </div>
        </div>
    );
};

export default Pokemon;